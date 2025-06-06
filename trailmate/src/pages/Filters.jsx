import FilterSlider from "../components/FilterSlider"
import {useDispatch, useSelector} from "react-redux"
import {updateElevation, updateDistance, resetElevationFilter, resetDistanceFilter } from "../store/trailFiltersSlice"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"

export default function Filters() {
    const dispatch = useDispatch()
    const nav = useNavigate()

    const minElevation = 0
    const minDistance = 0
    const maxDistance = 20
    const maxElevation = 1500
    
    let [elevation, setElevation] = useState(maxElevation/2)
    let [distance, setDistance] = useState(maxDistance/2)


    const handleSubmit = (e) => {
        e.preventDefault();

        const submitter = e.nativeEvent.submitter
        
        if (submitter.name === 'reset') {
            setElevation(0)
            setDistance(0)
            dispatch(resetElevationFilter())
            dispatch(resetDistanceFilter())
        } else {
            dispatch(updateElevation(elevation))
            dispatch(updateDistance(distance))
        }

        nav("/")
    }

    return (
        <>
        <div className="flex flex-col max-w-1/2 bg-[#A3B18A]">
            <form action="/" onSubmit={handleSubmit} >
                <FilterSlider min={minElevation} max={maxElevation} filterName={"Elevation"} value={elevation} onChange={setElevation} />
                <FilterSlider min={minDistance} max={maxDistance} filterName={"Distance"} value={distance} onChange={setDistance} />
                <div className="flex m-4 justify-between">
                    <button type="submit" name="reset" className="outline-1 outline-black rounded cursor-pointer px-2 py-1">Reset</button>
                    <button type="submit" name="apply" className="outline-1 outline-black rounded cursor-pointer px-2 py-1" >Apply</button>
                </div>
            </form>
        </div>
        </>
    )

}


