import TrailCard from "../components/TrailCard"
import trailData from "../data.json"
import { useDispatch, useSelector } from "react-redux"


export default function Favourites() {
    const currUser = useSelector(state => state.users.currUser)

    return (
        <>
            <div className="flex flex-col bg-[#A3B18A]">
                <h1 className="font-bold text-4xl pl-6 pt-8 pb-4 text-left">FAVOURITES</h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
                    {currUser.favourites.map((trail) => <TrailCard  trail={trail}/>)}
                
                </div>
            </div>
        </>
    )
}