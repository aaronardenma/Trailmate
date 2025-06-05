import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
function App() {

  return (
    <>
    <div className="flex justify-between">
      <h1 className="text-lg font-bold">TrailMate</h1>
      <Nav />
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>

    </>
  )
}

export default App
