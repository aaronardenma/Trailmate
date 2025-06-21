import TrailCard from "../components/TrailCard";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

export default function Favourites() {
    const [favTrails, setFavTrails] = useState([]);
    const user_id = localStorage.getItem("user_id");
    console.log(user_id)

    useEffect(() => {
        fetch(`http://localhost:5001/api/favorite/getFavoriteTrails/${user_id}`)
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((data) => {
                setFavTrails(data);
            })
            .catch((err) => console.error("Error fetching trails:", err));
    }, [user_id]);

    return (
        <div className="flex flex-col bg-[#A3B18A] min-h-screen">
            <h1 className="font-bold text-4xl pl-6 pt-8 pb-4 text-left">FAVOURITES</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
                {favTrails.length > 0 ? (
                    favTrails.map((trail) => <TrailCard key={trail.trailID} trail_id={trail.trailID} />)
                ) : (
                    <p className="text-center text-gray-700">No favorite trails found.</p>
                )}
            </div>
        </div>
    );
}
