import React from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngLiteral } from "leaflet";
import ClickableMap from "../atoms/polyline";
import AddRoadForm from "./add-road-form";
import L from "leaflet";

const AddRoadMaps = () => {
  const [positions, setPositions] = React.useState<LatLngLiteral[]>([]);

  const handleAddPoint = (latlng: LatLngLiteral) => {
    console.log(positions);
    setPositions((prev) => [...prev, latlng]);
  };

  const handleClearPoints = () => {
    setPositions([]);
  };

  const getPolylineLength = (positions: LatLngLiteral[]) => {
    let total = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      const from = L.latLng(positions[i]);
      const to = L.latLng(positions[i + 1]);
      total += from.distanceTo(to);
    }
    return total;
  };

  console.log(getPolylineLength(positions));

  return (
    <div className="w-full h-screen flex flex-row">
      <AddRoadForm />
      <div className="relative z-0 w-full flex-shrink p-8">
        <MapContainer
          center={[-8.409518, 115.188919]}
          zoom={13}
          className="h-[calc(100vh-4rem)] w-full rounded-2xl"
          style={{ zIndex: 0 }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickableMap
            onClick={handleAddPoint}
            onRightClick={handleClearPoints}
          />
          {positions.length > 0 && (
            <Polyline positions={positions} color="black" />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default AddRoadMaps;
