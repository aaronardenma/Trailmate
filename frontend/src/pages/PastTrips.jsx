import { useEffect, useState } from "react";
import TripCardDialog from "@/components/TripCardDialog";
import TripCard from "@/components/TripCard";
import { useLocation, useNavigate } from "react-router-dom";

export default function PastTrips() {
  const [pastTrips, setPastTrips] = useState([]);
  const [favorites, setFavorites] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const openTripId = location.state?.openTripId;

  const statusOrder = {
    "Upcoming": 0,
    "In Progress": 1,
    "Completed": 2,
  };

  useEffect(() => {
    const fetchPastTrips = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/trips/`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setPastTrips(
            data.trips.sort(
                (a, b) => statusOrder[a.status] - statusOrder[b.status]
            )
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchPastTrips();
  }, []);

  const handleDelete = async (tripId) => {
    try {
      const res = await fetch(
          `http://localhost:5001/api/trips/delete/${tripId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
      );

      const data = await res.json();

      if (data.success && res.ok) {
        console.log("deleted trip");
        setPastTrips((prevTrips) =>
            prevTrips.filter((trip) => trip._id !== tripId)
        );
      } else {
        throw new Error("trip not deleted");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTripClick = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  return (
      <div className="flex flex-col items-center">
        <h2 className="mt-16 mb-8 text-3xl font-bold max-w-4xl">Your Trips</h2>
        <div className="w-full max-w-4xl space-y-5">
          {pastTrips.length === 0 && (
              <p className="text-center text-gray-600">No past trips found.</p>
          )}
          {pastTrips.map((trip) => (
              <div key={trip._id} onClick={() => handleTripClick(trip._id)} className="cursor-pointer">
                <TripCard
                    trip={trip}
                    trail={trip.trailID}
                    onDelete={handleDelete}
                    defaultOpen={trip._id === openTripId}
                />
              </div>
          ))}
        </div>
      </div>
  );
}
