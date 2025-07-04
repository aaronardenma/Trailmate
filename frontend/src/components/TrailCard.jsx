import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import TrailCardDialog from "./TrailCardDialog";

export default function TrailCard({ trail_id }) {
    const [trail, setTrail] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchTrailData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/trails/getTrailById/${trail_id}`);
                if (!response.ok) throw new Error("Failed to fetch trail data");
                const data = await response.json();
                setTrail(data);

                const favRes = await fetch(`http://localhost:5001/api/favorite/isFavorite`, {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ trailID: trail_id }),
                });
                if (favRes.status === 404) {
                    setIsFavorite(false);
                } else {
                    const favData = await favRes.json();
                    setIsFavorite(favData.isFavorite);
                }
            
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrailData();
    }, [trail_id]);

    const handleFavoriteToggle = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isFavorite) {
            setIsFavorite(false);
            console.log("delete")
            try {
                await fetch("http://localhost:5001/api/favorite/deleteFavorite", {
                    method: "DELETE",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ trailID: trail_id }),
                });
            } catch (err) {
                // setIsFavorite(true);
            }
        } else {
            setIsFavorite(true);
            try {
                await fetch("http://localhost:5001/api/favorite/addFavorite", {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ trailID: trail_id }),
                });
            } catch (err) {
                // setIsFavorite(false);
            }
        }
    };

    if (!trail) return null;

    return (
        <div className="relative rounded group cursor-pointer mb-2 min-w-full max-w-1/3 hover:shadow-lg transition-all duration-200">
            <TrailCardDialog 
                trailId={trail._id}
                trigger={
                    <div className="block px-4 py-3 cursor-pointer">
                        <div className="relative overflow-hidden rounded-2xl">
                            <div>
                                <img
                                    src={trail.photoUrl}
                                    alt={trail.name}
                                    className="rounded-t-2xl w-full h-48 object-cover group-hover:scale-110 duration-200"
                                />
                            </div>
                            <button
                                onClick={handleFavoriteToggle}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 hover:bg-gray-100 hover:scale-110 transition z-10"
                            >
                                {isFavorite ? (
                                    <FaHeart className="text-red-500" />
                                ) : (
                                    <FaRegHeart className="text-gray-400" />
                                )}
                            </button>
                        </div>
                        
                        <h2 className="font-semibold text-lg">{trail.name}</h2>
                        <p className="text-sm text-gray-500">{trail.city}</p>
                    </div>
                }
                favorite ={isFavorite}
                setFavorite = {setIsFavorite}
            />
        </div>
    );
}