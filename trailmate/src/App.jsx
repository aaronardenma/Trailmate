import Home from "./pages/Home"
import Nav from "./components/Nav"
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
}

export default App
