import React from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { getRoadById, type Road } from "@/actions/get-roads";
import type { AddRoadFormData } from "@/lib/add-road-types";
import { GeomanPolyline } from "../atoms/polyline";
import { CustomAlert } from "../atoms/custom-alert";
import RoadForm from "../organisms/road-form";

type Coordinate = { lat: number; lng: number };

function mapRoadToFormData(road: Road): AddRoadFormData & { id: number } {
  let paths: Coordinate[] = [];
  if (typeof road.paths === "string") {
    try {
      paths = JSON.parse(road.paths);
    } catch {
      paths = [];
    }
  } else {
    paths = road.paths;
  }

  return {
    id: road.id,
    village_id: road.desa_id,
    road_name: road.nama_ruas,
    length: road.panjang,
    width: road.lebar,
    existing_id: road.eksisting_id,
    condition_id: road.kondisi_id,
    type_id: road.jenisjalan_id,
    description: road.keterangan,
    paths,
    road_code: parseInt(road.kode_ruas),
  };
}

const EditRoad = () => {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = React.useState<
    (AddRoadFormData & { id: number }) | null
  >(null);
  const [positions, setPositions] = React.useState<Coordinate[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    (async () => {
      const response = await getRoadById({ id, token });
      if (response.status === "success" && response.road) {
        const mappedData = mapRoadToFormData(response.road);
        setInitialData(mappedData);
        setPositions(mappedData.paths);
      }
    })();
  }, [id]);

  const getPolylineLength = (positions: Coordinate[]) => {
    let total = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      const from = L.latLng(positions[i]);
      const to = L.latLng(positions[i + 1]);
      total += from.distanceTo(to);
    }
    return total;
  };

  if (!initialData)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const lengthInMeters = Math.round(getPolylineLength(positions));

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="absolute bottom-[40px] right-[40px] z-20">
        {positions.length < 2 && (
          <CustomAlert desc="There has to be at least two points" />
        )}
      </div>

      <RoadForm
        paths={positions}
        length={lengthInMeters}
        initialData={initialData}
        isEdit={true}
      />

      <div className="relative z-0 w-full flex-shrink p-8">
        <MapContainer
          center={positions.length > 0 ? positions[0] : [-8.409518, 115.188919]}
          zoom={15}
          className="h-[calc(100vh-4rem)] w-full rounded-2xl"
          style={{ zIndex: 0 }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeomanPolyline
            initialPath={positions}
            onDraw={(latlngs) => {
              setPositions(latlngs);
            }}
          />

          {positions.length > 0 && <Polyline positions={positions} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default EditRoad;
