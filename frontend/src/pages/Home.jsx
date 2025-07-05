import TrailCard from "../components/TrailCard"
import {useState, useEffect, useMemo} from 'react'
// import trailData from "../data.json"
import Search from "../components/Search"
import { useSelector } from "react-redux"

export default function Home() {
    let [trailData, setTrailData] = useState([])
    let [searchKey, setSearchKey] = useState("")

    const elevationFilter = useSelector(state => state.filters.elevation)
    const distanceFilter = useSelector(state => state.filters.distance)
    const tagFilter = useSelector(state => state.filters.selectedTags)

    useEffect(() => {
        const fetchTrails = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/trails/getTrails");
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                const data = await res.json();
                setTrailData(data);
            } catch (err) {
                console.error("Error fetching trails:", err);
            }
        };
        fetchTrails();
    }, []);

    const handleSearch = (e) => {
        setSearchKey(e.target.value);
    };

    const searchTrails = () => {
        let searchedTrails = [];
        // console.log("trailData.length:", trailData.length);
        if (searchKey === "") {
            searchedTrails = trailData;
        } else {
            for (let i = 0; i < trailData.length; i++) {
                if (trailData[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
                    searchedTrails.push(trailData[i]);
                }
            }
        }

        // console.log("searchedTrails.length:", searchedTrails.length);
        // console.log("Filters - elevation:", elevationFilter, "distance:", distanceFilter, "tags:", tagFilter);
        
        const filteredTrails = filterTrails(searchedTrails, elevationFilter, distanceFilter, tagFilter);
        console.log(filteredTrails)
        // console.log("filteredTrails.length:", filteredTrails.length);
        return filteredTrails.map((trail) => (
            <TrailCard key={trail._id} trail_id={trail._id} />
        ));
    };

    const filterTrails = (arr, elevation, distance, tags) => {
        let filteredTrails = [];
        if (arr.length > 0) {
            // console.log("Sample trail data:", arr[0]);
        }
        
        for (let i = 0; i < arr.length; i++) {
            if (
                arr[i].avgElevationM < elevation &&
                arr[i].distanceKm < distance &&
                tags.every((selectedTag) => arr[i].tags.includes(selectedTag))
            ) {
                filteredTrails.push(arr[i]);
            }
        }
        return filteredTrails;
    };

    const results = useMemo(() => {
        if (trailData.length === 0) {
            return [];
        }
        return searchTrails();
    }, [trailData, searchKey, elevationFilter, distanceFilter, tagFilter]);

    return (
        <div className="flex flex-col text-center bg-[#A3B18A]">
            <Search className="px-4 w-full" handleSearch={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
                {trailData.length === 0 ? (
                    <span className="p-4 font-semibold text-lg">Loading trails...</span>
                ) : results.length > 0 ? results : (
                    <span className="p-4 font-semibold text-lg">
                        No trails found for "{searchKey}"
                    </span>
                )}
            </div>
        </div>
    );
}