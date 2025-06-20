import { IoFilterCircleOutline } from "react-icons/io5";
import { IoFilterCircle } from "react-icons/io5";
import {updateElevation, updateDistance, resetElevationFilter, resetDistanceFilter } from "../store/trailFiltersSlice"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react'
import FilterSlider from "./FilterSlider";

export default function Search(props) {
    const dispatch = useDispatch()

    const minElevation = 0
    const minDistance = 0
    const maxDistance = 20
    const maxElevation = 1500
    
    let [elevation, setElevation] = useState(maxElevation/2)
    let [distance, setDistance] = useState(maxDistance/2)
    let [filtersApplied, setFiltersApplied] = useState(false)

    const handleSubmit = (e) => {
            e.preventDefault();
    
            const submitter = e.nativeEvent.submitter
            
            if (submitter.name === 'reset') {
                setElevation(0)
                setDistance(0)
                setFiltersApplied(false)
                dispatch(resetElevationFilter())
                dispatch(resetDistanceFilter())
            } else {
                setFiltersApplied(true)
                dispatch(updateElevation(elevation))
                dispatch(updateDistance(distance))
            }
        }

    return (
        <div className="flex relative items-center w-full max-w-sm min-w-[200px] self-center my-4">
            <input className="w-full bg-transparent placeholder:text-slate-100 text-slate-700 text-sm border border-slate-100 rounded-md px-3 py-2 pr-10
            transition duration-300 ease focus:outline-none focus:border-slate-700 shadow-sm focus:shadow" placeholder="Search" onChange={props.handleSearch} />
            <Dialog>
                <DialogTrigger className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {filtersApplied ? <IoFilterCircle className="text-white text-2xl" /> : <IoFilterCircleOutline className="text-white text-2xl" />}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogDescription>
                        filters for trails
                    </DialogDescription>
                    </DialogHeader>
                    <form action="/" onSubmit={handleSubmit} >
                        <FilterSlider min={minElevation} max={maxElevation} filterName={"Elevation (m)"} value={elevation} onChange={setElevation} />
                        <FilterSlider min={minDistance} max={maxDistance} filterName={"Distance (km)"} value={distance} onChange={setDistance} />
                        <DialogFooter className="flex flex-col justify-between">
                        <DialogClose asChild>
                            <Button type="submit"name="reset" variant="secondary">
                            Reset
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" name="apply" variant="secondary">
                            Submit
                            </Button>
                        </DialogClose>
                        
                    </DialogFooter>
                    </form>
                    
                </DialogContent>
            </Dialog>
            {}
            
        </div>
    )
}

