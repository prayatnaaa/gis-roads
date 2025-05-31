import {
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import DeleteRoadButton from "../molecules/delete-road-button";
import { useRoadStore } from "@/stores/road-data-stores";
import { useEffect } from "react";

type HomeMapsProps = {
  location: [number, number];
};

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
};

const HomeMaps = ({ location }: HomeMapsProps) => {
  const roads = useRoadStore((state) => state.roads);
  const token = localStorage.getItem("token");

  return (
    <MapContainer
      center={location}
      zoom={10}
      className="h-screen w-full"
      style={{ zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ChangeView center={location} />

      {roads.length > 0 &&
        roads.map((data) =>
          Array.isArray(data.paths) ? (
            <Polyline
              key={data.id}
              positions={data.paths.map((point) => [point.lat, point.lng])}
              color="blue"
            >
              <Popup>
                <div className="w-full min-w-full h-fit max-h-screen flex flex-col items-center justify-between">
                  <h1 className="font-semibold">{data.nama_ruas}</h1>
                  <p>{data.keterangan}</p>
                  <DeleteRoadButton token={token as string} id={data.id} />
                </div>
              </Popup>
            </Polyline>
          ) : null
        )}
    </MapContainer>
  );
};

export default HomeMaps;
