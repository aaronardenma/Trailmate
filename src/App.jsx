import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
import NavGuest from "./components/NavGuest.jsx"
import { Routes, Route } from "react-router-dom"
import Filters from "./pages/Filters"
import Landing from "./pages/Landing.jsx"
import Favourites from "./pages/Favourites"
import UserProfile from "./pages/UserProfile"
import TrailPage from "@/pages/TrailPage.jsx";
import { useState } from "react"
import Auth from "./pages/Auth.jsx"
import SetUpAccount from "./pages/SetUpAccount.jsx"
import { useSelector } from "react-redux"

function App() {
  const loggedIn = useSelector(state => state.users.loggedIn)

  return (
    <>
    <div className="font-display">
      {loggedIn ? <Nav className="p-2" /> : <></>}
      <Routes>
        {loggedIn? <Route path="/" element={<Home />} /> : <Route path="/" element={<Landing />} />}
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth/:type" element={<Auth />} />
        <Route path="/setup" element={<SetUpAccount />} />
        <Route path="/map" element={<Map />} />
        <Route path="/trail/:id" element={<TrailPage />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
      </>
  )
}

export default App
