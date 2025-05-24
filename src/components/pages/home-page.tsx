import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UserAvatarDialog } from "../molecules/user-avatar-dialog";
import { RegionSheet } from "../molecules/region-sheet";
import React from "react";
import { getAllRegion } from "@/actions/get-all-region";
import type { AllRegionProps } from "@/lib/region-type";
import { data } from "react-router-dom";
import { LogoutDialog } from "../molecules/logout-dialog";

function Home() {
  const [regionData, setRegionData] = React.useState<AllRegionProps | null>(
    null
  );
  const token = localStorage.getItem("token");
  console.log(token);

  const fetchRegionData = async () => {
    try {
      console.log("TOKEN:", token);
      const region = await getAllRegion(token as string);
      console.log("====================");
      if (region.success && region.data) {
        setRegionData(region.data);
      } else {
        console.error("Failed to fetch region:", region.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  React.useEffect(() => {
    fetchRegionData();
  }, [token]);

  if (data == null) {
    return;
  }

  return (
    <>
      <div className="relative z-0 h-screen w-full">
        <div className="absolute top-2.5 right-2.5 z-10">
          <div className="w-full gap-2 flex flex-row">
            {/* TODO: FIX the User menu dialog */}
            {/* <UserAvatarDialog /> */}
            <LogoutDialog />
            {regionData && <RegionSheet data={regionData!} />}
          </div>
        </div>
        <MapContainer
          center={[-2.5489, 118.0149]}
          zoom={6}
          className="h-screen w-full"
          style={{ zIndex: 0 }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </>
  );
}

export default Home;
