import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Map from "./pages/Map.jsx"
import Nav from "./components/Nav"
<<<<<<< HEAD
import {Route, Routes} from "react-router-dom";
import UserProfile from "./pages/UserProfile.jsx";

function App() {

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold">TrailMate</h1>
                <Nav/>
            </div>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/user' element={<UserProfile/>}></Route>
            </Routes>
        </>
    )
=======
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Filters from "./pages/Filters"

function App() {

  return (
    <>
    <div className="flex justify-between">
      <h1 className="text-lg font-bold">TrailMate</h1>
      <Nav />
    </div>
    <BrowserRouter>
      <Routes>
     <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/filters" element={<Filters />} />
      </Routes>
    
    </BrowserRouter>       

    </>
  )
>>>>>>> e55b0b5ce29f4f8f902633d805881ba47653ce3e
}

export default App
