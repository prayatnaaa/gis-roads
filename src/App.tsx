import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Home from "./components/pages/home-page";
import AddRoad from "./components/pages/add-road-page";
import Register from "./components/pages/register-page";
import Login from "./components/pages/login-page";
import React from "react";
import { useRegionStore } from "./stores/region-stores";
import { useRoadStore } from "./stores/road-data-stores";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const region = useRegionStore((state) => state.fetchRegion);
  const road = useRoadStore((state) => state.fetchRoad);
  const isRegionLoaded = useRegionStore((state) => state.isLoaded);

  React.useEffect(() => {
    if (token && location.pathname == "/") {
      road(token);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const authRoutes = ["/auth/login", "/auth/register"];

    if (!token && !authRoutes.includes(location.pathname)) {
      navigate("/auth/login");
    }
  }, [token, navigate, location]);

  React.useEffect(() => {
    if (token && !isRegionLoaded) {
      region(token);
    }
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-road" element={<AddRoad />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
