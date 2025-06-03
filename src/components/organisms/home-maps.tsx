import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import { useRoadStore } from "@/stores/road-data-stores";
import { useEffect } from "react";
import { getRoadStyle } from "@/actions/get-road-styles";
import { useLocationStore } from "@/stores/map-location-stores";

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
  const setLocId = useLocationStore((state) => state.setLocation);
  const selectedLocId = useLocationStore.getState().id;

  return (
    <MapContainer
      center={location}
      zoom={13}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ChangeView center={location} />

      {roads.length > 0 &&
        roads.map((data) =>
          Array.isArray(data.paths) ? (
            <Polyline
              key={data.id}
              positions={data.paths.map((point) => [point.lat, point.lng])}
              pathOptions={getRoadStyle(data.jenisjalan_id, data.kondisi_id)}
              eventHandlers={{
                click: () => {
                  if (Array.isArray(data.paths) && data.paths.length > 0) {
                    const firstPoint = data.paths[0];
                    setLocId(
                      firstPoint.lat,
                      firstPoint.lng,
                      data.id.toString()
                    );
                  }
                },
              }}
              className={
                selectedLocId === String(data.id) ? "glowing-polyline" : ""
              }
            ></Polyline>
          ) : null
        )}
    </MapContainer>
  );
};

export default HomeMaps;
