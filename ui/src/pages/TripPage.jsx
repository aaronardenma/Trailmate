import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TripPage() {
    const [tripStarted, setTripStarted] = useState(true);
    const { _id } = useParams();
    const user_id = localStorage.getItem("user_id");

    const date = new Date().toISOString().slice(0, 10);

    const handleEndTrip = async () => {
        setTripStarted(false);
        try {
            await fetch("http://localhost:5001/api/trips/addTrip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user_id,
                    trailID: _id,
                    date,
                    status: "finished",
                    userRating: 0,
                    userComments: "",
                }),
            });
        } catch (err) {
            console.error("Failed to add trip:", err);


        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6">
            {tripStarted ? (
                <>
                    <h1 className="text-3xl font-bold text-green-700 mb-6">
                        Your trip has started!
                    </h1>
                    <button
                        onClick={handleEndTrip}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                        End Trip
                    </button>
                </>
            ) : (
                <h1 className="text-2xl font-semibold text-gray-700">
                    No active trips at the moment.
                </h1>
            )}
        </div>
    );
}
