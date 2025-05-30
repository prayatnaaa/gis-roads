import { MapContainer, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { UserAvatarDialog } from "../molecules/user-avatar-dialog";
import React from "react";
import { LogoutDialog } from "../molecules/logout-dialog";
import { getAllRoads, type Road } from "@/actions/get-all-roads";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import DeleteRoadButton from "../molecules/delete-road-button";

function Home() {
  const [roadData, setRoadData] = React.useState<Road[] | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchRoadData = async () => {
    try {
      if (!token) {
        console.error("Token not found");
        navigate("auth/login");
        return;
      }
      const roads = await getAllRoads(token);
      setRoadData(roads);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  React.useEffect(() => {
    fetchRoadData();
  }, [token]);

  if (roadData === null) {
    return <div>Loading roads...</div>;
  }

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

        <div className="absolute bottom-2.5 right-2.5 z-10">
          <Button
            variant="secondary"
            className="hover:cursor-pointer"
            onClick={() => navigate("add-road")}
          >
            Add Road
          </Button>
        </div>
        <MapContainer
          center={[-8.409518, 115.188919]}
          zoom={10}
          className="h-screen w-full"
          style={{ zIndex: 0 }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {roadData.length > 0 &&
            roadData.map((data) =>
              Array.isArray(data.paths) ? (
                <Polyline key={data.id} positions={data.paths}>
                  <Popup>
                    <div className="w-full min-w-full h-fit max-h-screen flex flex-col items-center justify-between">
                      <h1 className="font-semibold">{data.nama_ruas}</h1>
                      <p>{data.keterangan}</p>
                      <DeleteRoadButton token={token as string} id={data.id} />
                    </div>
                  </Popup>
                </Polyline>
              ) : null
            )}
        </MapContainer>
      </div>
    </>
  );
}

export default Home;
