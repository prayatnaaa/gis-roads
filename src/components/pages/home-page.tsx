import "leaflet/dist/leaflet.css";
import { TabularRoadData } from "../organisms/tabular-road-data";
import { roadTableColumns, type RoadTable } from "@/lib/road-table-columns";
import { useRegionStore } from "@/stores/region-stores";
import { useRoadStore } from "@/stores/road-data-stores";
import HomeMaps from "../organisms/home-maps";
import { useLocationStore } from "@/stores/map-location-stores";
import { ViewedLocationInfo } from "../molecules/viewed-location-info";
import { FilterDialog } from "../molecules/filter-dialog";
import type { PlaceValueProps } from "@/lib/region-type";
import React from "react";
import { UserAvatarDialog } from "../molecules/user-avatar-dialog";

function Home() {
  const roads = useRoadStore((state) => state.roads);
  const desa = useRegionStore((state) => state.desa);
  const location = useLocationStore((state) => state.location);
  const roadID = useLocationStore((state) => state.id);
  const isSelected = useLocationStore((state) => state.isSelected);

  const [filters, setFilters] = React.useState<{
    roadType: PlaceValueProps[];
    roadCondition: PlaceValueProps[];
    existing: PlaceValueProps[];
  }>({
    roadType: [],
    roadCondition: [],
    existing: [],
  });

  const filteredRoads = roads?.filter((road) => {
    const matchesType =
      filters.roadType.length === 0 ||
      filters.roadType.some((type) => type.id === road.jenisjalan_id);

    const matchesCondition =
      filters.roadCondition.length === 0 ||
      filters.roadCondition.some(
        (condition) => condition.id === road.kondisi_id
      );

    const matchesExisting =
      filters.existing.length === 0 ||
      filters.existing.some((exist) => exist.id === road.eksisting_id);

    return matchesType && matchesCondition && matchesExisting;
  });

  const tableData: RoadTable[] =
    filteredRoads?.map((road) => {
      const desaName =
        desa.find((d) => d.id === road.desa_id)?.value || "Unknown Desa";

      console.log(desa);

      const roadType =
        road.jenisjalan_id == 1
          ? "Desa"
          : road.jenisjalan_id == 2
          ? "Kabupaten"
          : road.jenisjalan_id == 3
          ? "Provinsi"
          : "Unkown type";

      const existing = road.eksisting_id == 1 ? "Ada" : "apa";
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
        paths: road.paths,
        name: road.nama_ruas,
        location: desaName,
        condition: status,
        width: road.lebar,
        length: road.panjang,
        road_type: roadType,
        existing: existing,
      };
    }) ?? [];

  return (
    <div className="flex flex-row-reverse gap-8 w-full h-screen p-8 overflow-hidden">
      <div className="flex-1 relative border rounded-lg overflow-hidden">
        {isSelected && <ViewedLocationInfo id={roadID} />}
        <HomeMaps location={location} roads={filteredRoads} />
      </div>

      <div className="w-1/2 z-10 overflow-y-auto relative">
        <TabularRoadData
          columns={roadTableColumns}
          data={tableData}
          filterButton={<FilterDialog onFilter={setFilters} />}
        />

        <div className="absolute bottom-0 left-0">
          {/* <LogoutDialog /> */}
          <UserAvatarDialog />
        </div>
      </div>
    </div>
  );
}

export default Home;
