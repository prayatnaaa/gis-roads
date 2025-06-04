import { useMap } from "react-leaflet";
import { useEffect } from "react";
import type { LatLngLiteral } from "leaflet";

export const GeomanPolyline = ({
  onDraw,
  initialPath,
}: {
  onDraw: (latlngs: LatLngLiteral[]) => void;
  initialPath?: LatLngLiteral[];
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.pm.addControls({
      position: "topleft",
      drawCircle: false,
      drawText: false,
      drawMarker: false,
      drawRectangle: false,
      drawPolygon: false,
      drawCircleMarker: false,
    });

    const handleCreate = (e: any) => {
      if (e.shape === "Line" && e.layer) {
        let latlngs = e.layer.getLatLngs();
        if (Array.isArray(latlngs[0])) {
          latlngs = latlngs.flat();
        }

        onDraw(latlngs);
        e.layer.remove();
      }
    };

    map.on("pm:create", handleCreate);

    let editLayer: any = null;

    if (initialPath && initialPath.length > 0) {
      const L = require("leaflet");
      editLayer = L.polyline(initialPath).addTo(map);

      editLayer.pm.enable({ allowSelfIntersection: false });
      editLayer.pm.setOptions({ allowEditing: true });

      editLayer.on("pm:edit", (e: any) => {
        const newLatLngs = e.layer.getLatLngs();
        onDraw(newLatLngs);
      });
    }

    return () => {
      map.pm.removeControls();
      map.off("pm:create", handleCreate);

      if (editLayer) {
        map.removeLayer(editLayer);
      }
    };
  }, [map, onDraw, initialPath]);

  return null;
};
