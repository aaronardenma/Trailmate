import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
import { Routes, Route, useLocation } from "react-router-dom"
import Filters from "./pages/Filters"
import Landing from "./pages/Landing.jsx"
import Favourites from "./pages/Favourites"
import UserProfile from "./pages/UserProfile"
import TrailPage from "@/pages/TrailPage.jsx";
import GearPlanner from "./pages/GearPlanner.jsx"; 
import Register from './pages/Register.jsx';

function App() {
  const location = useLocation()
  const noNavPaths = ["/login", "/register", "/landing"]
  const showNav = !noNavPaths.includes(location.pathname)

  return (
    <>
    <div className="font-display">
      {showNav && <Nav className="p-2" />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/map" element={<Map />} />
        <Route path="/trail/:id" element={<TrailPage />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/gear-planner" element={<GearPlanner />} /> 
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
      </>
  )
}

export default App
