import "leaflet/dist/leaflet.css";
import { TabularRoadData } from "../organisms/tabular-road-data";
import { roadTableColumns, type RoadTable } from "@/lib/road-table-columns";
import { useRegionStore } from "@/stores/region-stores";
import { useRoadStore } from "@/stores/road-data-stores";
import HomeMaps from "../organisms/home-maps";
import { useLocationStore } from "@/stores/map-location-stores";
import { ViewedLocationInfo } from "../molecules/viewed-location-info";

function Home() {
  const roads = useRoadStore((state) => state.roads);
  const desa = useRegionStore((state) => state.desa);
  const location = useLocationStore((state) => state.location);
  const roadID = useLocationStore((state) => state.id);
  const isSelected = useLocationStore((state) => state.isSelected);

  const tableData: RoadTable[] =
    roads?.map((road) => {
      const desaName =
        desa.find((d) => d.id === road.desa_id)?.desa || "Unknown Desa";
      const status =
        road.kondisi_id == 1
          ? "Baik"
          : road.kondisi_id == 2
          ? "Sedang"
          : road.kondisi_id == 3
          ? "Rusak"
          : "Tidak tahu";
      return {
        id: road.id,
        name: road.nama_ruas,
        location: desaName,
        condition: status,
      };
    }) ?? [];

  return (
    <div className="flex flex-row-reverse gap-8 w-full h-screen p-8 overflow-hidden">
      <div className="flex-1 relative border rounded-lg overflow-hidden">
        {isSelected && <ViewedLocationInfo id={roadID} />}
        <HomeMaps location={location} />
      </div>

      <div className="w-1/2 z-10 overflow-y-auto">
        <TabularRoadData columns={roadTableColumns} data={tableData} />
      </div>
    </div>
  );
}

export default Home;
