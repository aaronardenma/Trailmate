import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TrailCard({ trail_id }) {
    const [trail, setTrail] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchTrailData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/trails/getTrailById/${trail_id}`);
                if (!response.ok) throw new Error("Failed to fetch trail data");
                const data = await response.json();
                setTrail(data);

                if (user_id) {
                    const favRes = await fetch(`http://localhost:5001/api/favorite/isFavorite`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user_id, trailID: trail_id }),
                    });
                    if (favRes.status === 404) {
                        setIsFavorite(false);
                    } else {
                        const favData = await favRes.json();
                        setIsFavorite(favData.isFavorite);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrailData();
    }, [trail_id, user_id]);

    const handleFavoriteToggle = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isFavorite) {
            setIsFavorite(false);
            console.log("delete")
            try {
                await fetch("http://localhost:5001/api/favorite/deleteFavorite", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user_id, trailID: trail_id }),
                });
            } catch (err) {
                // setIsFavorite(true);
            }
        } else {
            setIsFavorite(true);
            try {
                await fetch("http://localhost:5001/api/favorite/addFavorite", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user_id, trailID: trail_id }),
                });
            } catch (err) {
                // setIsFavorite(false);
            }
        }
    };

    if (!trail) return null;

    return (
        <div className="relative rounded cursor-pointer mb-2 min-w-full max-w-1/3 hover:shadow-lg transition-shadow duration-200">
            <Link
                to={`/trail/${trail._id}`}
                className="block px-4 py-3"
            >
            <div className="relative">
                <img
                    src={trail.photoUrl}
                    alt={trail.name}
                    className="rounded-t-2xl w-full h-48 object-cover"
                />
                <button
                    onClick={handleFavoriteToggle}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-100 transition"
                >
                    {isFavorite ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="none"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3
                        7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3
                        19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    )}
                </button>
            </div>
            
                <h2 className="font-semibold text-lg">{trail.name}</h2>
                <p className="text-sm text-gray-500">{trail.city}</p>
            </Link>
        </div>
    );
}
