import { useEffect, useState } from "react";
import TripCardDialog from "@/components/TripCardDialog";
import TripCard from "@/components/TripCard";
import { useLocation } from "react-router-dom";

export default function PastTrips() {
  const [pastTrips, setPastTrips] = useState([]);
  const [favorites, setFavorites] = useState({});
  const location = useLocation();
  const openTripId = location.state?.openTripId;
  const [filter, setFilter] = useState('Status')

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

  const filterTrips = () => {
    // console.log(e.target.value)
    if (filter === 'Status') {
      return pastTrips
    }

    return pastTrips.filter((trip) => (trip.status === filter))
  }


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
  const filteredTrips = filterTrips()

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-16 mb-8 text-3xl font-bold max-w-4xl">Your Trips</h2>
      <div className="w-full max-w-4xl space-y-5">
        <div className="flex justify-start">
          <select name="" value={filter} onChange={(e) => setFilter(e.target.value)} id="" className="outline p-1 rounded-md mb-4">
            <option value="Status">Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {filteredTrips.length === 0 && (
          <p className="text-center text-gray-600">No past trips found.</p>
        )}
        {filteredTrips.map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
            trail={trip.trailID}
            onDelete={handleDelete}
            defaultOpen={trip._id === openTripId}
          />
        ))}
      </div>
    </div>
  );
}
