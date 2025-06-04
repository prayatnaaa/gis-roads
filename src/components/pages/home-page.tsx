import React from "react";
import "leaflet/dist/leaflet.css";
import { TabularRoadData } from "../organisms/tabular-road-data";
import { roadTableColumns, type RoadTable } from "@/lib/road-table-columns";
import { useRegionStore } from "@/stores/region-stores";
import { useRoadStore } from "@/stores/road-data-stores";
import HomeMaps from "../organisms/home-maps";
import { useLocationStore } from "@/stores/map-location-stores";
import { ViewedLocationInfo } from "../molecules/viewed-location-info";
import { LogoutDialog } from "../molecules/logout-dialog";
// import { Combobox } from "../molecules/combo-box";
// import { getRoadType } from "@/actions/get-road-status";
// import type { PlaceValueProps } from "@/lib/region-type";

function Home() {
  const roads = useRoadStore((state) => state.roads);
  const desa = useRegionStore((state) => state.desa);
  const location = useLocationStore((state) => state.location);
  const roadID = useLocationStore((state) => state.id);
  const isSelected = useLocationStore((state) => state.isSelected);

  const [selectedTypeId, setSelectedTypeId] = React.useState<number | null>(
    null
  );
  // const [roadTypes, setRoadTypes] = React.useState<PlaceValueProps[]>([]);
  // const [typeNameMap, setTypeNameMap] = React.useState<Map<number, string>>(
  //   new Map()
  // );

  // const token = localStorage.getItem("token");

  // React.useEffect(() => {
  //   if (!token) return;
  //   (async () => {
  //     const response = await getRoadType(token);
  //     const types =
  //       response.data?.types.map((t) => ({ id: t.id, value: t.value })) || [];

  //     setRoadTypes(types);

  //     const map = new Map<number, string>();
  //     types.forEach((t) => map.set(t.id, t.value));
  //     setTypeNameMap(map);
  //   })();
  // }, [token]);

  const filteredRoads = React.useMemo(() => {
    if (!selectedTypeId) return roads;
    return roads?.filter((road) => road.jenisjalan_id === selectedTypeId);
  }, [roads, selectedTypeId]);

  const tableData: RoadTable[] =
    filteredRoads?.map((road) => {
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

      <div className="w-1/2 z-10 overflow-y-auto relative">
        {/* {roadTypes.length > 0 && (
          <div className="mb-4 px-2 pt-2">
            <Combobox
              name="Filter by road type..."
              properties={roadTypes}
              selectedId={selectedTypeId ?? undefined}
              onChange={(selected) => setSelectedTypeId(selected.id)}
            />
            <button
              className="text-sm text-blue-500 mt-2 underline"
              onClick={() => setSelectedTypeId(null)}
            >
              Reset filter
            </button>
          </div>
        )} */}

        <TabularRoadData columns={roadTableColumns} data={tableData} />

        <div className="absolute bottom-2.5 left-2.5">
          <LogoutDialog />
        </div>
      </div>
    </div>
  );
}

export default Home;
