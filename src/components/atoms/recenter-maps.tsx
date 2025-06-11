import { useMap } from "react-leaflet";
import { useEffect } from "react";
import type { LatLngLiteral } from "leaflet";

const RecenterMap = ({ center }: { center: LatLngLiteral }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
};

export default RecenterMap;
