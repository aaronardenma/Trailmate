import TripCardDialog from "./TripCardDialog";
import { useState } from "react";

export default function TripCard({ trip, onDelete, defaultOpen}) {
    const [date, setDate] = useState({from: trip.startDate, to: trip.endDate})
    const [status, setStatus] = useState(trip.status)
    const [isOpen, setIsOpen] = useState(defaultOpen || false);


  const handleDelete = () => {
    onDelete(trip._id);
  };



  return (
    <div className="relative rounded cursor-pointer mb-2 min-w-full max-w-1/3 hover:shadow-lg transition-shadow duration-200">
      <TripCardDialog
        trip={trip}
        date = {date}
        setDate = {setDate}
        status = {status}
        setStatus = {setStatus}
        open={isOpen} onOpenChange={setIsOpen}
        trigger={
          <div className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="w-1/3">
              <img
                src={trip.trailID.photoUrl || "https://via.placeholder.com/150"}
                alt={trip.trailID.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-2/3 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-800">
                {trip.trailID.name}
              </h3>

              <div className="mt-4 flex flex-col space-y-1">
                <div className="font-semibold">
                  <span>Status:{" "}</span>
                  <span
                    className={`${
                      status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                {status === "Completed" && (
                  <div className="font-semibold">
                    <span>Rating:{" "}</span>
                    <span
                      className={`${
                        status === "Completed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {trip.userRating}/5
                    </span>
                  </div>
                )}
                <div className="font-semibold">
                    <span>Date:{" "}</span>
                    <span className="text-gray-600">
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                </div>
                <p>
                
              </p>
              </div>
              
            </div>
            <div className="flex flex-col justify-center p-4 space-y-2">
              <button
                className="outline rounded-md p-2 h-fit cursor-pointer bg-red-500 hover:bg-red-600 font-bold text-white transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
