import TrailCard from "../components/TrailCard"
import {useState} from 'react'
import trailData from "../data.json"
import Search from "../components/Search"
import { useSelector } from "react-redux"
import FilterTag from "../components/FilterTag"

export default function Home() {
    let [searchKey, setSearchKey] = useState("")

    const handleSearch = (e) => {
        setSearchKey(e.target.value)
    }
    
    const searchTrails = () => {
        let searchedTrails = []
        let trails = trailData
        if (searchKey === "") {
            searchedTrails = trails
        } else {
            for (let i = 0; i < trails.length; i++) {
                if (trails[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
                    searchedTrails.push(trails[i])
                } else {
                    continue;
                }
            }
        }
        const filteredTrails = filterTrails(searchedTrails)
        return filteredTrails.map((trail) => (
            <TrailCard key={trail.id} trail ={trail}/>
        ));
    }

    const filterTrails = (arr) => {
        const elevationFilter = useSelector(state => state.filters.elevation)
        const distanceFilter = useSelector(state => state.filters.distance)
        const tagFilter = useSelector(state => state.filters.tags)
        
        // console.log(`elevation filter: ${elevationFilter}`)
        // console.log(`distance filter: ${distanceFilter}`)
        // console.log(`filtered input arr legnth: ${arr.length}`)

        let filteredTrails = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].avgElevationM < elevationFilter && arr[i].distanceKm < distanceFilter && tagFilter.every((selectedTag) => {
                return arr[i].tags.includes(selectedTag)
            })) {
                filteredTrails.push(arr[i])
            } else {
                continue;
            }
        }

        return filteredTrails
    }

    const results = searchTrails()
    
    return (
        <div className="flex flex-col text-center bg-[#A3B18A]">
            <Search className="px-4 w-full" handleSearch={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
                {results.length > 0 ? results : (<span className="p-4 font-semibold text-lg">No trails found for "{searchKey}"</span>)}
            </div>
        </div>
    )
};
