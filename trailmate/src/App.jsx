import Home from "./pages/Home"
import Nav from "./components/Nav"
import { Route } from "react-router-dom"

function App() {

  return (
    <>
    <div className="flex justify-between">
      <h1 className="text-lg font-bold">TrailMate</h1>
      <Nav />
    </div>
    {/* <Route>
      
    </Route> */}
    <Home />
    </>
  )
}

export default App
