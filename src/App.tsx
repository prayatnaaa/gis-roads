import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Home from "./components/pages/home-page";
import AddRoad from "./components/pages/add-road-page";
import Register from "./components/pages/register-page";
import Login from "./components/pages/login-page";
import React from "react";
import { useRegionStore } from "./stores/region-stores";
import { useRoadStore } from "./stores/road-data-stores";
import EditRoad from "./components/pages/edit-road-page";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const region = useRegionStore((state) => state.fetchRegion);
  const isRegionLoaded = useRegionStore((state) => state.isLoaded);

  const road = useRoadStore((state) => state.fetchRoad);
  const isError = useRoadStore((state) => state.isError);

  React.useEffect(() => {
    if (isError) {
      navigate("auth/login");
    }
  }, [isError, navigate]);

  React.useEffect(() => {
    const authRoutes = ["/auth/login", "/auth/register"];

    if (!token && !authRoutes.includes(location.pathname)) {
      navigate("/auth/login");
      return;
    }

    if (token) {
      if (!isRegionLoaded) region(token);
      if (location.pathname === "/") road(token);
    }
  }, [token, location.pathname, isRegionLoaded, region, road, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-road" element={<AddRoad />} />
      <Route path="/edit-road/:id" element={<EditRoad />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="auth/login" element={<Login />} />
    </Routes>
  );
}

export default App;
