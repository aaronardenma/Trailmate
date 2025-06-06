import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
import { Routes, Route, Link } from "react-router-dom"
import Filters from "./pages/Filters"
import Favourites from "./pages/Favourites"
import UserProfile from "./pages/UserProfile"

function App() {

  return (
    <>
    <div className="flex justify-between items-center">
      <Link to="/" className="text-2xl text-[#588157] font-bold p-4">
        TrailMate
      </Link>
      <Nav className="p-2" />
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      </>
  )
}

export default App
