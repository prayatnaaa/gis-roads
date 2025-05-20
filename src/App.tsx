import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Home from "./components/pages/home-page";
import AddRoad from "./components/pages/add-road-page";
import Register from "./components/pages/register-page";
import Login from "./components/pages/login-page";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-road" element={<AddRoad />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="auth/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
