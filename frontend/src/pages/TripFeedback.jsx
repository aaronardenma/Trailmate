import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationMap from "@/components/LocationMap.jsx";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


export default function TripFeedback() {
  const [tripStarted, setTripStarted] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const { tripId } = useParams();
  const [trail, setTrail] = useState(null);
  const [trip, setTrip] = useState(null);
  const date = new Date().toISOString().slice(0, 10);

  const [userRating, setUserRating] = useState(0);
  const [userComments, setUserComments] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const tripResponse = await fetch(
          `http://localhost:5001/api/trips/${tripId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!tripResponse.ok) throw new Error("Failed to fetch trip data");
        const tripData = await tripResponse.json();
        console.log(tripData);
        console.log(tripData.trip.trailID);
        setTrip(tripData);

        const trailResponse = await fetch(
          `http://localhost:5001/api/trails/getTrailById/${tripData.trip.trailID}`
        );
        const trailData = await trailResponse.json();
        setTrail(trailData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTripData();
  }, []);

  const handleSubmitFeedback = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5001/api/trips/end/${tripId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userRating,
          userComments,
        }),
      });

      Toastify({
        text: "Feedback submitted",
        duration: 3000,
        style: {
            background: 'green', text: 'white', font: 'bold'
        }
      }).showToast();

      nav("/profile/trips", { state: { openTripId: tripId }});

    } catch (err) {
      console.error("Failed to submit feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!trail) {
    return (
      <div className="p-6 text-center text-gray-600">Loading trail data...</div>
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
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Leave Your Feedback
          </h1>
          <div className="w-full max-w-md space-y-4">
            <label className="block text-gray-700 font-semibold">
              Your Rating
            </label>
            <select
              value={userRating}
              onChange={(e) => setUserRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-green-400"
            >
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold">
              Comments
            </label>
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
        </div>
      </div>
    </div>
  );
}
