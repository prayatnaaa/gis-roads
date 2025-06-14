import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
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
  const tempLayerRef = useRef<any>(null);

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
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: true,
      rotateMode: false,
      drawText: false,
    });

    const onMouseMove = (mouseEvent: L.LeafletMouseEvent) => {
      const tempLayer = tempLayerRef.current;
      if (!tempLayer) return;

      const latlngs = tempLayer.getLatLngs();
      const flatLatLngs = Array.isArray(latlngs[0]) ? latlngs.flat() : latlngs;

      const previewLatLngs = [...flatLatLngs, mouseEvent.latlng];
      onDraw(previewLatLngs);
    };

    const handleDrawStart = (e: any) => {
      if (e.workingLayer && e.shape === "Line") {
        tempLayerRef.current = e.workingLayer;
        map.on("mousemove", onMouseMove);
      }
    };

    const handleCreate = (e: any) => {
      if (e.shape === "Line" && e.layer) {
        let latlngs = e.layer.getLatLngs();
        if (Array.isArray(latlngs[0])) {
          latlngs = latlngs.flat();
        }

        onDraw(latlngs);
        e.layer.remove();

        // Matikan mousemove dan hapus ref
        map.off("mousemove", onMouseMove);
        tempLayerRef.current = null;
      }
    };

    const handleRemove = (e: any) => {
      if (e.layer instanceof L.Polyline) {
        onDraw([]);
      }
    };

    map.on("pm:drawstart", handleDrawStart);
    map.on("pm:create", handleCreate);
    map.on("pm:remove", handleRemove);

    map.on("pm:drawend", () => {
      map.off("mousemove", onMouseMove);
      tempLayerRef.current = null;
    });

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
      map.off("pm:drawstart", handleDrawStart);
      map.off("pm:create", handleCreate);
      map.off("pm:remove", handleRemove);
      map.off("pm:drawend");
      map.off("mousemove", onMouseMove);
      if (editLayer) map.removeLayer(editLayer);
    };
  }, [map, onDraw, initialPath]);

  return null;
};
