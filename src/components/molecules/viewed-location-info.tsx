import { useRoadStore } from "@/stores/road-data-stores";
import { useLocationStore } from "@/stores/map-location-stores";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import EditRoadButton from "../atoms/edit-road-button";
import { RoadDescDialog } from "./road-desc-dialog";

const kondisiLabels: Record<number, string> = {
  1: "Baik",
  2: "Sedang",
  3: "Rusak",
};

const eksistingLabels: Record<number, string> = {
  1: "Aspal",
  2: "Kerikil",
  3: "Tanah",
  4: "Beton",
  12: "Beton Bertulang",
};

const jenisJalanLabels: Record<number, string> = {
  1: "Jalan Kabupaten",
  2: "Jalan Desa",
  3: "Jalan Lingkungan",
};

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
        <CardDescription>Desa ID: {road.desa_id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <strong>Kondisi</strong>
            {kondisiLabels[road.kondisi_id] || `ID ${road.kondisi_id}`}
          </div>
          <div className="flex justify-between">
            <strong>Keterangan</strong>{" "}
            <RoadDescDialog desc={road.keterangan} />
          </div>
          <div className="flex justify-between">
            <strong>Eksisting</strong>
            {eksistingLabels[road.eksisting_id] || `ID ${road.eksisting_id}`}
          </div>
          <div className="flex justify-between">
            <strong>Jenis Jalan</strong>
            {jenisJalanLabels[road.jenisjalan_id] || `ID ${road.jenisjalan_id}`}
          </div>
          <div className="flex justify-between">
            <strong>Kode Ruas</strong> {road.kode_ruas}
          </div>
          <div className="flex justify-between">
            <strong>Lebar (m):</strong> {road.lebar}
          </div>
          <div className="flex justify-between">
            <strong>Panjang (m)</strong> {road.panjang}
          </div>
          <EditRoadButton id={road.id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
}
