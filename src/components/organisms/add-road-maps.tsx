import React from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngLiteral } from "leaflet";
import { CustomAlert } from "../atoms/custom-alert";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet";
import "@geoman-io/leaflet-geoman-free";
import { GeomanPolyline } from "../atoms/polyline";
import RoadForm from "./road-form";
import { nominatimSearch } from "@/actions/nominatim-search";
import { toast } from "sonner";
import { NominatimInput } from "../molecules/nominatim-input";
import RecenterMap from "../atoms/recenter-maps";

const AddRoadMaps = () => {
  const [positions, setPositions] = React.useState<LatLngLiteral[]>([]);
  const [center, setCenter] = React.useState<LatLngLiteral>({
    lat: -8.409518,
    lng: 115.188919,
  });

  const getPolylineLength = (positions: LatLngLiteral[]) => {
    let total = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      const from = L.latLng(positions[i]);
      const to = L.latLng(positions[i + 1]);
      total += from.distanceTo(to);
    }
    return total;
  };

  const lengthInMeters = Math.round(getPolylineLength(positions));

  const handleNominatim = async (q: string) => {
    const response = await nominatimSearch(q);

    if (response.status === "failed") {
      toast("Something went wrong", { description: "Try again later" });
      return;
    }

    if (
      response.status === "success" &&
      Array.isArray(response.coordinates) &&
      response.coordinates.length === 2
    ) {
      const [lng, lat] = response.coordinates as unknown as [number, number];
      setCenter({ lat, lng } as LatLngLiteral);
    } else {
      toast("Something went wrong", { description: "Try again later" });
    }
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="absolute bottom-[40px] right-[40px] z-20">
        {positions.length === 0 && (
          <CustomAlert desc="There has to be at least two points" />
        )}
      </div>
      <RoadForm
        paths={positions}
        length={lengthInMeters}
        input={<NominatimInput onSearch={handleNominatim} />}
      />
      <div className="relative z-0 w-full flex-shrink p-8">
        <MapContainer
          center={center}
          zoom={13}
          className="h-[calc(100vh-4rem)] w-full rounded-2xl"
          style={{ zIndex: 0 }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap center={center} />
          <GeomanPolyline onDraw={(latlngs) => setPositions(latlngs)} />

          {positions.length > 0 && (
            <Polyline positions={positions} color="black" />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default AddRoadMaps;
