import "leaflet/dist/leaflet.css";
// import { UserAvatarDialog } from "../molecules/user-avatar-dialog";
import { LogoutDialog } from "../molecules/logout-dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { TabularRoadData } from "../organisms/tabular-road-data";
import { roadTableColumns, type RoadTable } from "@/lib/road-table-columns";
import { useRegionStore } from "@/stores/region-stores";
import { useRoadStore } from "@/stores/road-data-stores";
import HomeMaps from "../organisms/home-maps";
import { useLocationStore } from "@/stores/map-location-stores";
import { ViewedLocationInfo } from "../molecules/viewed-location-info";

function Home() {
  const roads = useRoadStore((state) => state.roads);
  const navigate = useNavigate();
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
    <>
      <div className="relative z-0 h-screen w-full">
        <div className="absolute top-2.5 right-2.5 z-10">
          <div className="w-full gap-2 flex flex-row">
            {/* TODO: FIX the User menu dialog */}
            {/* <UserAvatarDialog /> */}
            <LogoutDialog />
          </div>
        </div>

        {isSelected && <ViewedLocationInfo id={roadID} />}

        <div className="absolute bottom-2.5 right-2.5 z-10">
          <Button
            variant="secondary"
            className="hover:cursor-pointer"
            onClick={() => navigate("add-road")}
          >
            Add Road
          </Button>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full items-center">
            <TabularRoadData data={tableData} columns={roadTableColumns} />
          </div>
          <HomeMaps location={location} />
        </div>
      </div>
    </>
  );
}

export default Home;
