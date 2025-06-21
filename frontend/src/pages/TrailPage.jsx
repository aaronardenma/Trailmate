import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import LocationMap from "../components/LocationMap.jsx";

export default function TrailPage() {
    const { _id } = useParams();
    const user_id = localStorage.getItem("user_id");
    const [trail, setTrail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const fetchTrailData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/trails/getTrailById/${_id}`);
                if (!response.ok) throw new Error("Failed to fetch trail data");
                const data = await response.json();
                setTrail(data);
                setLoading(false);

                if (user_id) {
                    const favRes = await fetch(`http://localhost:5001/api/favorite/isFavorite`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user_id, trailID: _id }),
                    });
                    if (favRes.status === 404) {
                        setFavorite(false);
                    } else {
                        const favData = await favRes.json();
                        setFavorite(favData.isFavorite);
                    }
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchTrailData();
    }, [_id, user_id]);

    const handleFavorite = async () => {
        if (!user_id) {
            alert("You must be logged in to favorite trails.");
            return;
        }

        if (favorite) {
            setFavorite(false);
            try {
                await fetch("http://localhost:5001/api/favorite/deleteFavorite", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user_id, trailID: _id }),
                });
            } catch (err) {
                setFavorite((fav) => !fav);
                alert("Error updating favorite: " + err.message);
            }
        } else {
            setFavorite(true);
            try {
                await fetch("http://localhost:5001/api/favorite/addFavorite", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user_id, trailID: _id }),
                });
            } catch (err) {
                setFavorite((fav) => !fav);
                alert("Error updating favorite: " + err.message);
            }
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#DAD7CD] to-[#f0eee7] py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                <div className="relative bg-white shadow-xl rounded-xl px-8 py-6 border border-gray-200">
                    <h1 className="text-4xl font-extrabold text-center text-[#2F4F4F]">{trail.name}</h1>
                    <button
                        onClick={handleFavorite}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                        className="absolute top-4 right-4 rounded-full p-2 bg-white shadow hover:bg-gray-100 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-7 w-7 transition-colors duration-300 ${
                                favorite ? "text-yellow-400" : "text-gray-400"
                            }`}
                            fill={favorite ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.04a1 1 0 00.95.69h7.406c.969 0 1.371 1.24.588 1.81l-6.003 4.357a1 1 0 00-.364 1.118l2.286 7.039c.3.922-.755 1.688-1.54 1.118l-6.003-4.357a1 1 0 00-1.175 0l-6.003 4.357c-.785.57-1.84-.196-1.54-1.118l2.286-7.039a1 1 0 00-.364-1.118L2.82 12.467c-.783-.57-.38-1.81.588-1.81h7.406a1 1 0 00.95-.69l2.286-7.04z"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <img
                        src={trail.photoUrl}
                        alt={trail.name}
                        className="lg:w-1/2 w-full rounded-xl shadow-lg object-cover max-h-[400px] border border-gray-300"
                    />
                    <div className="lg:w-1/2 h-[400px] rounded-xl shadow-lg overflow-hidden border border-gray-300">
                        <LocationMap
                            location={{ lat: trail.latitude, lng: trail.longitude }}
                            name={trail.name}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed text-lg">{trail.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p><strong className="text-gray-800">Distance:</strong> <span className="text-gray-600">{trail.distance} miles</span></p>
                        <p><strong className="text-gray-800">Elevation:</strong> <span className="text-gray-600">{trail.elevation}</span></p>
                        <p><strong className="text-gray-800">Estimated Time:</strong> <span className="text-gray-600">{trail.time} minutes</span></p>
                        <p><strong className="text-gray-800">Location:</strong> <span className="text-gray-600">{trail.city}</span></p>
                        <p className="sm:col-span-2"><strong className="text-gray-800">Coordinates:</strong> <span className="text-gray-600">{trail.latitude.toFixed(5)}, {trail.longitude.toFixed(5)}</span></p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Link
                    to={`/planTrip/${trail._id}`}
                    className="bg-[#A3B18A] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#859966] transition flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Plan Your Trip
                </Link>
            </div>

        </div>
    );
}
