import FilterSlider from "../components/FilterSlider"
import {useDispatch, useSelector} from "react-redux"
import {updateElevation, updateDistance, resetElevationFilter, resetDistanceFilter } from "../store/trailFiltersSlice"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"

export default function Filters() {
    const dispatch = useDispatch()
    const nav = useNavigate()

    let [elevation, setElevation] = useState(0)
    let [distance, setDistance] = useState(0)

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
        <div className="flex flex-col max-w-1/2">
            <form action="/" onSubmit={handleSubmit} >
                <FilterSlider min={0} max={100} filterName={"Elevation"} value={elevation} onChange={setElevation} />
                <FilterSlider min={0} max={250} filterName={"Distance"} value={distance} onChange={setDistance} />
                <div>
                    <button type="submit" name="reset" className="outline rounded cursor-pointer px-2 py-1 self-center">Reset</button>
                    <button type="submit" name="apply" className="outline rounded cursor-pointer px-2 py-1 self-center" >Apply</button>
                </div>
            </form>
        </div>
        </>
    )

}