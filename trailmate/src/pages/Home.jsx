import TrailCard from "../components/TrailCard"
import {useState} from 'react'
import trailData from "../data.json"
import Search from "../components/Search"

export default function Home() {
    let [searchKey, setSearchKey] = useState("")

    const handleSearch = (e) => {
        setSearchKey(e.target.value)
    }
    
    const searchTrails = () => {
        let searchedTrails = []
            if (searchKey === "") {
            return (
                trailData.map((trail) => (
        <TrailCard name={trail.name} key={trail.name.toLowerCase()} img={trail.photoUrl} />
        ))
            )

            }
            for (let i = 0; i < trailData.length; i++) {
            if (trailData[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
                searchedTrails.push(trailData[i])
            } else {
                continue;
            }
        }
    
        return searchedTrails.map((trail) => (
        <TrailCard name={trail.name} key={trail.name.toLowerCase()} img={trail.photoUrl} />
        ));
    }

    const results = searchTrails()
    
    return (
        <div className="flex flex-col text-center bg-[#A3B18A]">
            <Search handleSearch={handleSearch} />
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
                {results.length > 0 ? results : (<span className="p-4 font-semibold text-lg">No trails found for "{searchKey}"</span>)}
            </div>
        </div>
    )
}