import Home from "./pages/Home"
import Nav from "./components/Nav"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
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
        <Route path="/filters" element={<Filters />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
        </>
  )
}

export default App
