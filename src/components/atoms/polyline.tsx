import { useMap } from "react-leaflet";
import { useEffect } from "react";
import type { LatLngLiteral } from "leaflet";
import L from "leaflet";

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
      position: "topright",
      drawCircle: false,
      drawMarker: false,
      drawPolygon: false,
      drawPolyline: true,
      drawRectangle: false,
      drawCircleMarker: false,
      editMode: true,
      dragMode: false,
      cutPolygon: false,
      removalMode: true,
      rotateMode: false,
      drawText: false,
    });

    let tempLayer: any = null;

    const handleDrawStart = (e: any) => {
      if (e.workingLayer && e.shape === "Line") {
        tempLayer = e.workingLayer;

        tempLayer.on("pm:draw", () => {
          const latlngs = tempLayer.getLatLngs();
          const flatLatLngs = Array.isArray(latlngs[0])
            ? latlngs.flat()
            : latlngs;
          onDraw(flatLatLngs); // Kirim data ke parent setiap ada titik baru
        });
      }
    };

    const handleCreate = (e: any) => {
      if (e.shape === "Line" && e.layer) {
        let latlngs = e.layer.getLatLngs();
        if (Array.isArray(latlngs[0])) {
          latlngs = latlngs.flat();
        }

        console.log(latlngs);

        onDraw(latlngs);
        e.layer.remove();
      }
    };

    const handleRemove = (e: any) => {
      const removedLayer = e.layer;
      if (removedLayer instanceof L.Polyline) {
        onDraw([]);
      }
    };

    map.on("pm:create", handleCreate);
    map.on("pm:remove", handleRemove);
    map.on("pm:drawstart", handleDrawStart);

    let editLayer: any = null;

    if (initialPath && initialPath.length > 0) {
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
      map.off("pm:remove", handleRemove);
      map.off("pm:drawstart", handleDrawStart);

      if (editLayer) {
        map.removeLayer(editLayer);
      }
    };
  }, [map, onDraw, initialPath]);

  return null;
};
