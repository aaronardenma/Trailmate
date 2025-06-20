import TrailCard from "../components/TrailCard";
import { useState, useEffect } from "react";
// import {trails} from "../data.js";
import Search from "../components/Search";
import { useSelector } from "react-redux";

export default function Home() {
    const [searchKey, setSearchKey] = useState("");
    const [trailData, setTrailData] = useState([]);

    const elevationFilter = useSelector((state) => state.filters.elevation);
    const distanceFilter = useSelector((state) => state.filters.distance);
    localStorage.setItem('user_id', '68551e80e12a0479b20847ef');
    useEffect(() => {
        fetch("http://localhost:5001/api/trails/getTrails")
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((data) => {
                setTrailData(data);
            })
            .catch((err) => console.error("Error fetching trails:", err));
    }, []);

    console.log(trailData)
    // useEffect(() => {
    //     const addTrail = async (trail) => {
    //         try {
    //             const res = await fetch("http://localhost:5001/api/trails/addTrail", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(trail),
    //             });
    //
    //             if (!res.ok) {
    //                 throw new Error(`Error adding trail: ${res.statusText}`);
    //             }
    //
    //             const data = await res.json();
    //             console.log(`Trail added: ${data.name}`);
    //         } catch (error) {
    //             console.error( error.message);
    //         }
    //     };
    //
    //     trails.forEach(addTrail);
    //     setTrailData(trails);
    // }, []);

    // const handleSearch = (e) => {
    //     setSearchKey(e.target.value);
    // };
    //
    // const searchTrails = () => {
    //     let searched = trailData;
    //
    //     if (searchKey !== "") {
    //         searched = searched.filter((trail) =>
    //             trail.name.toLowerCase().includes(searchKey.toLowerCase())
    //         );
    //     }
    //
    //     return filterTrails(searched);
    // };

    // const filterTrails = (arr) => {
    //     return arr.filter(
    //         (trail) =>
    //             trail.avgElevationM < elevationFilter &&
    //             trail.distanceKm < distanceFilter
    //     );
    // };
    //
    // const results = searchTrails();

    return (
        <div className="flex flex-col text-center bg-[#A3B18A]">
            {/*<Search handleSearch={handleSearch} />*/}

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
                {trailData.length > 0 ? (
                    trailData.map((trail) => <TrailCard key={trail.id} trail={trail} />)
                )
                    : (
                    <span className="p-4 font-semibold text-lg">
                        No trails found for "{searchKey}"
                    </span>
                )}
            </div>
        </div>
    );
}
