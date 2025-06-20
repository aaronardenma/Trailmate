import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
import { Routes, Route } from "react-router-dom"
import Filters from "./pages/Filters"
import Landing from "./pages/Landing.jsx"
import Favourites from "./pages/Favourites"
import UserProfile from "./pages/UserProfile"
import TrailPage from "@/pages/TrailPage.jsx";
import PlanTripPage from "@/pages/PlanTrip.jsx";
import TripPage from "@/pages/TripPage.jsx";
import CommunityPage from "@/pages/CommunityPage.jsx";
import UserPostPage from "@/pages/UserPostPage.jsx";

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
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/planTrip/:_id" element={<PlanTripPage />} />
        <Route path="/trip/:_id" element={<TripPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/yourPosts" element={<UserPostPage />} />
      </Routes>
    </div>
      </>
  )
}

export default App
