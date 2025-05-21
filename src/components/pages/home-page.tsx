import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UserAvatarDialog } from "../molecules/user-avatar-dialog";

function Home() {
  return (
    <>
      <div className="relative z-0 h-screen w-full">
        <div className="absolute top-2.5 right-2.5 z-10">
          <UserAvatarDialog />
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
