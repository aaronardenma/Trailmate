import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
import {BrowserRouter, Routes, Route, useRoutes} from "react-router-dom"
import Filters from "./pages/Filters"
import UserProfile from "./pages/UserProfile.jsx";


function App() {
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold">TrailMate</h1>
                <Nav/>
            </div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/map" element={<Map/>}/>
                <Route path="/filters" element={<Filters/>}/>
                <Route path="/user" element={<UserProfile />}></Route>
            </Routes>
        </>
    )
}

export default App
