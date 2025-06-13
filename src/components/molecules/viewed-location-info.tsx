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
import { useRegionStore } from "@/stores/region-stores";
import { lengthFormatter } from "@/lib/length-formatter";

const kondisiLabels: Record<number, string> = {
  1: "Baik",
  2: "Sedang",
  3: "Rusak",
};

const eksistingLabels: Record<number, string> = {
  1: "Tanah",
  2: "Tanah/Beton",
  3: "Perkerasan",
  4: "Koral",
  5: "Lapen",
  6: "Paving",
  7: "Hotmix",
  8: "Beton",
  9: "Beton/Lapen",
};

const jenisJalanLabels: Record<number, string> = {
  1: "Jalan desa",
  2: "Jalan kabupaten",
  3: "Jalan provinsi",
};

export function ViewedLocationInfo({ id }: { id: string }) {
  const roads = useRoadStore((state) => state.roads);
  const villages = useRegionStore((state) => state.desa);
  const village = (id: number): string => {
    const data = villages.find((v) => v.id === id);
    return data?.value as string;
  };
  const resetLocation = useLocationStore((state) => state.resetLocation);

  const road = roads.find((r) => String(r.id) === String(id));

  if (!road) return null;

  return (
    <Card className="sm:absolute left-1/2 bottom-1 transform -translate-x-1/2 z-50 sm:w-[600px]">
      <CardHeader>
        <div
          className="absolute top-2.5 right-2.5 hover:cursor-pointer opacity-25 hover:opacity-80"
          onClick={resetLocation}
        >
          <X />
        </div>
        <CardTitle>{road.nama_ruas}</CardTitle>
        <CardDescription>{village(road.desa_id)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="grid grid-flow-col grid-rows-2 gap-4 text-sm">
          <div className="flex flex-col">
            <strong>Condition</strong>
            {kondisiLabels[road.kondisi_id] || `ID ${road.kondisi_id}`}
          </div>
          <div className="flex flex-col">
            <strong>Existing</strong>
            {eksistingLabels[road.eksisting_id] || `ID ${road.eksisting_id}`}
          </div>
          <div className="flex flex-col">
            <strong>Road type</strong>
            {jenisJalanLabels[road.jenisjalan_id] || `ID ${road.jenisjalan_id}`}
          </div>

          <div className="flex flex-col">
            <strong>Width (m):</strong> {road.lebar}
          </div>
          <div className="flex flex-col">
            <strong>Length (m)</strong> {lengthFormatter(road.panjang)}
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center self-end">
          <RoadDescDialog desc={road.keterangan} />
          <EditRoadButton id={road.id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
}
