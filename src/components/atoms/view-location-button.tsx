import { useLocationStore } from "@/stores/map-location-stores";
import { useRoadStore } from "@/stores/road-data-stores";

type ViewLocationProps = {
  token: string;
  id: number;
};

const ViewLocationButton = ({ token, id }: ViewLocationProps) => {
  const setLocation = useLocationStore((state) => state.setLocation);
  const roads = useRoadStore((state) => state.roads);

  const handleViewClick = async () => {
    try {
      if (!token) return;

      const road = roads.find((r) => r.id === id);

      if (!road || !Array.isArray(road.paths) || road.paths.length === 0)
        return;

      const { lat, lng } = road.paths.reduce(
        (acc, point) => {
          return {
            lat: acc.lat + point.lat / road.paths.length,
            lng: acc.lng + point.lng / road.paths.length,
          };
        },
        { lat: 0, lng: 0 }
      );

      setLocation(lat, lng, id.toString());
    } catch (err) {
      console.error("Failed to set location from road:", err);
    }
  };
  return (
    <span
      className="text-sm text-blue-600 hover:font-semibold hover:cursor-pointer"
      onClick={handleViewClick}
    >
      View
    </span>
  );
};

export default ViewLocationButton;
