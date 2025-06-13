import {
  MapContainer,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import { getRoadStyle } from "@/actions/get-road-styles";
import { useLocationStore } from "@/stores/map-location-stores";
import React from "react";
import { useRegionStore } from "@/stores/region-stores";
import type { Road } from "@/actions/get-roads";

type HomeMapsProps = {
  location: [number, number];
  roads: Road[];
};

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  const zoomControl = useLocationStore((state) => state.zoomLevel);

  useEffect(() => {
    map.flyTo(center, zoomControl, { animate: true });
  }, [center, map]);

  return null;
};

const HomeMaps = ({ location, roads }: HomeMapsProps) => {
  const setLocId = useLocationStore((state) => state.setLocation);
  const selectedLocId = useLocationStore((state) => state.id);
  const villages = useRegionStore((state) => state.desa);
  const village = (id: number): string => {
    const data = villages.find((item) => item.id == id);
    if (!data) {
      return "Village unknown";
    }
    return data.value;
  };

  return (
    <MapContainer
      center={location}
      zoom={11}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ChangeView center={location} />

      {roads.length > 0 &&
        roads.map((data) =>
          Array.isArray(data.paths) ? (
            <React.Fragment key={data.id}>
              {String(data.id) === selectedLocId && (
                <>
                  <Polyline
                    positions={data.paths.map((p) => [p.lat, p.lng])}
                    pathOptions={{
                      ...getRoadStyle(data.jenisjalan_id, data.kondisi_id),
                      weight: 20,
                      opacity: 0.3,
                    }}
                    interactive={false}
                  />
                  <Polyline
                    positions={data.paths.map((p) => [p.lat, p.lng])}
                    pathOptions={{
                      ...getRoadStyle(data.jenisjalan_id, data.kondisi_id),
                      weight: 14,
                      opacity: 0.5,
                    }}
                    interactive={false}
                  />
                </>
              )}
              <Polyline
                positions={data.paths.map((p) => [p.lat, p.lng])}
                pathOptions={getRoadStyle(data.jenisjalan_id, data.kondisi_id)}
                eventHandlers={{
                  click: () => {
                    if (Array.isArray(data.paths) && data.paths.length > 0) {
                      try {
                        const { lat, lng } = data.paths.reduce(
                          (acc, point) => {
                            return {
                              lat: acc.lat + point.lat / data.paths.length,
                              lng: acc.lng + point.lng / data.paths.length,
                            };
                          },
                          { lat: 0, lng: 0 }
                        );

                        setLocId(lat, lng, data.id.toString());
                      } catch (err) {
                        console.error(
                          "Failed to set location from path data:",
                          err
                        );
                      }
                    }
                  },
                }}
              >
                {" "}
                <Tooltip
                  sticky
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent={false}
                >
                  <div className="flex flex-col text-sm rounded-lg">
                    <strong>{data.nama_ruas}</strong>
                    <span>{village(data.desa_id)}</span>
                  </div>
                </Tooltip>
              </Polyline>
            </React.Fragment>
          ) : null
        )}
    </MapContainer>
  );
};

export default HomeMaps;
