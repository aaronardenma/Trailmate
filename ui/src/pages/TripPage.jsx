import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationMap from "@/components/LocationMap.jsx";

export default function TripPage() {
    const [tripStarted, setTripStarted] = useState(true);
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const { _id } = useParams();
    const user_id = localStorage.getItem("user_id");
    const [trail, setTrail] = useState(null);
    const date = new Date().toISOString().slice(0, 10);

    const [userRating, setUserRating] = useState(0);
    const [userComments, setUserComments] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTrailData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/trails/getTrailById/${_id}`);
                if (!response.ok) throw new Error("Failed to fetch trail data");
                const data = await response.json();
                setTrail(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrailData();
    }, [_id]);

    const handleEndTrip = async () => {
        setTripStarted(false);
    };

    const handleSubmitFeedback = async () => {
        setLoading(true);
        try {
            await fetch("http://localhost:5001/api/trips/addTrip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user_id,
                    trailID: _id,
                    date,
                    status: "finished",
                    userRating,
                    userComments,
                }),
            });
            setFeedbackGiven(true);
        } catch (err) {
            console.error("Failed to submit feedback:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!trail) {
        return <div className="p-6 text-center text-gray-600">Loading trail data...</div>;
    }

    if (feedbackGiven) {
        return (
            <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center px-6">
                <h1 className="text-3xl font-bold text-green-700 mb-4">Thank you for your feedback!</h1>
                <p className="text-gray-700 max-w-md text-center">
                    Your review helps others plan their adventures.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] to-white py-12 px-6 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 rounded-xl overflow-hidden shadow-md border border-gray-300">
                    <LocationMap
                        location={{ lat: trail.latitude, lng: trail.longitude }}
                        name={trail.name}
                    />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center items-center space-y-6">
                    {tripStarted ? (
                        <>
                            <h1 className="text-4xl font-extrabold text-green-700 text-center">
                                Your trip has started!
                            </h1>
                            <p className="text-gray-700 text-center max-w-md">
                                Enjoy your adventure on <strong>{trail.name}</strong>. Stay safe and don’t forget to check back here to end your trip when you're done.
                            </p>
                            <button
                                onClick={handleEndTrip}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
                            >
                                End Trip
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-gray-800 text-center">
                                Leave Your Feedback
                            </h1>
                            <div className="w-full max-w-md space-y-4">
                                <label className="block text-gray-700 font-semibold">Your Rating</label>
                                <select
                                    value={userRating}
                                    onChange={(e) => setUserRating(Number(e.target.value))}
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-green-400"
                                >
                                    <option value={0}>Select rating</option>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                                    ))}
                                </select>

                                <label className="block text-gray-700 font-semibold">Comments</label>
                                <textarea
                                    value={userComments}
                                    onChange={(e) => setUserComments(e.target.value)}
                                    rows={4}
                                    placeholder="Write your experience..."
                                    className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:border-green-400"
                                />

                                <button
                                    onClick={handleSubmitFeedback}
                                    disabled={loading || userRating === 0}
                                    className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {loading ? "Submitting..." : "Submit Feedback"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
