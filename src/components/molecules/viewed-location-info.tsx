import { useEffect, useState } from "react";
import { getRoadById, type Road } from "@/actions/get-roads";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocationStore } from "@/stores/map-location-stores";

// TODO: update UI
export function ViewedLocationInfo({ id }: { id: string }) {
  const [road, setRoad] = useState<Road>();
  const resetLocation = useLocationStore((state) => state.resetLocation);

  useEffect(() => {
    const fetchRoad = async () => {
      const token = localStorage.getItem("token") as string;
      if (token) {
        try {
          const result = await getRoadById({ token, id });
          setRoad(result.road);
        } catch (err) {
          console.error("Failed to fetch road:", err);
        }
      }
    };
    fetchRoad();
  }, [id]);

  return (
    <Card className="w-[350px] absolute top-2 right-2 z-50">
      <CardHeader>
        <div
          className="absolute top-2.5 right-2.5 hover:cursor-pointer"
          onClick={resetLocation}
        >
          X
        </div>
        <CardTitle>{road?.nama_ruas}</CardTitle>
        <CardDescription>{road?.keterangan}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-center">
          {road?.nama_ruas}
        </div>
      </CardContent>
    </Card>
  );
}
