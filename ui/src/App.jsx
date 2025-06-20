import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
import { Routes, Route } from "react-router-dom"
import Filters from "./pages/Filters"
import Landing from "./pages/Landing.jsx"
import Favourites from "./pages/Favourites"
import UserProfile from "./pages/UserProfile"
import TrailPage from "@/pages/TrailPage.jsx";

function App() {

  return (
    <>
    <div className="font-display">
      <Nav className="p-2" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/map" element={<Map />} />
        <Route path="/trail/:_id" element={<TrailPage />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/favourites/:_id" element={<Favourites />} />
        <Route path="/profile/:_id" element={<UserProfile />} />
      </Routes>
    </div>
      </>
  )
}

export default App
