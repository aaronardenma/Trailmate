import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
import {BrowserRouter, Routes, Route, useRoutes} from "react-router-dom"
import { Routes, Route, Link } from "react-router-dom"
import Filters from "./pages/Filters"
import UserProfile from "./pages/UserProfile.jsx";

import Favourites from "./pages/Favourites"
import UserProfile from "./pages/UserProfile"

function App() {

  return (
    <>
    <div className="font-display">
      <Nav className="p-2" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
      </>
  )
}

export default App
