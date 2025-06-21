import { IoFilterCircleOutline } from "react-icons/io5";
import { IoFilterCircle } from "react-icons/io5";
import { updateElevation, updateDistance, updateTags, resetElevationFilter, resetDistanceFilter, resetTagFilter } from "../store/trailFiltersSlice"
import { useDispatch } from "react-redux";
import { useState } from 'react'
import FilterDialog from "./FilterDialog";

export default function Search(props) {
  const dispatch = useDispatch()
  const [filtersApplied, setFiltersApplied] = useState(false)

  const handleFiltersApply = ({ elevation, distance, tags }) => {
    setFiltersApplied(true)
    dispatch(updateElevation(elevation))
    dispatch(updateDistance(distance))
    dispatch(updateTags(tags))
  }

  const handleFiltersReset = () => {
    setFiltersApplied(false)
    dispatch(resetElevationFilter())
    dispatch(resetDistanceFilter())
    dispatch(resetTagFilter())
  }

  const filterTrigger = (
    <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
      {filtersApplied ? 
        <IoFilterCircle className="text-white text-2xl" /> : 
        <IoFilterCircleOutline className="text-white text-2xl" />
      }
    </button>
  )

  return (
    <div className="flex items-center gap-3 w-full max-w-md self-center my-4">
      <div className="relative flex-1">
        <input 
          className="w-full bg-transparent placeholder:text-slate-100 text-slate-700 text-sm border border-slate-100 rounded-md px-3 py-2 pr-12
          transition duration-300 ease focus:outline-none focus:border-slate-700 shadow-sm focus:shadow" 
          placeholder="Search trails" 
          onChange={props.handleSearch} 
        />
        <FilterDialog 
          trigger={filterTrigger}
          onFiltersApply={handleFiltersApply}
          onFiltersReset={handleFiltersReset}
          initialElevation={750}
          initialDistance={10}
        />
      </div>
      
      {filtersApplied && (
        <button 
          className="px-3 py-2 text-sm font-medium text-[#3A5A40] bg-[#DAD7CD] border border-[#DAD7CD] rounded-md 
          hover:bg-[#c5c2b8] hover:border-[#c5c2b8] transition-colors duration-200 whitespace-nowrap"
          onClick={handleFiltersReset}
        >
          Reset
        </button>
      )}
    </div>
  )
}