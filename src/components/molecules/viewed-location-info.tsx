import { useRoadStore } from "@/stores/road-data-stores";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocationStore } from "@/stores/map-location-stores";
import { X } from "lucide-react";

export function ViewedLocationInfo({ id }: { id: string }) {
  const roads = useRoadStore((state) => state.roads);
  const resetLocation = useLocationStore((state) => state.resetLocation);

  const road = roads.find((r) => String(r.id) === String(id));

  if (!road) return null;

  return (
    <Card className="w-[350px] absolute top-2 right-2 z-50">
      <CardHeader>
        <div
          className="absolute top-2.5 right-2.5 hover:cursor-pointer opacity-25 hover:opacity-80"
          onClick={resetLocation}
        >
          <X />
        </div>
        <CardTitle>{road.nama_ruas}</CardTitle>
        <CardDescription>{road.desa_id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>{road.desa_id}</div>
          <div>{road.kondisi_id}</div>
          <div>{road.keterangan}</div>
          <div>{road.eksisting_id}</div>
          <div>{road.id}</div>
          <div>{road.jenisjalan_id}</div>
          <div>{road.kode_ruas}</div>
          <div>{road.lebar}</div>
          <div>{road.panjang}</div>
          {/* {road.paths.toString()} */}
        </div>
        <div className="w-full flex items-center justify-center">
          {road.nama_ruas}
        </div>
      </CardContent>
    </Card>
  );
}
