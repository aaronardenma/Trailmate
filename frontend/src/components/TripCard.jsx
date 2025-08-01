import { useNavigate } from "react-router-dom";
import TripCardDialog from "./TripCardDialog";
import { useState } from "react";
import { GoTrash } from "react-icons/go";

export default function TripCard({ trip, onDelete, defaultOpen}) {
    const [isOpen, setIsOpen] = useState(defaultOpen || false);
    const [date, setDate] = useState({from: trip.startDate, to: trip.endDate})
    const [userRating, setUserRating] = useState(trip.userRating)

    const nav = useNavigate()

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(trip._id);
  };

  const handleFinish = async (e) => {
    e.stopPropagation();
    nav(`/trip/${trip._id}`)
  }

  return (
    <div className="relative rounded cursor-pointer min-w-full max-w-1/3 hover:shadow-lg transition-shadow duration-200">
      <button
        className="absolute top-3 right-3 cursor-pointer z-10 group flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-red-50 border border-gray-200 hover:border-red-300 transition-all duration-200 hover:shadow-md"
        onClick={handleDelete}
        title="Delete trip"
      >
        <GoTrash 
          className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors duration-200" 
        />
      </button>

      <TripCardDialog
        trip={trip}
        date = {date} setDate = {setDate}
        userRating = {userRating} setUserRating={setUserRating}
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
              <h3 className="text-xl font-bold text-gray-800 pr-8">
                {trip.trailID.name}
              </h3>

              <div className="mt-4 flex flex-col space-y-1">
                <div className="font-semibold">
                  <span>Status:{" "}</span>
                  <span
                    className={`${
                      trip.status === "Completed"
                        ? "text-green-500"
                        : trip.status === "In Progress" ? "text-yellow-400" : "text-blue-300"
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>
                {trip.status === "Completed" && (
                  <div className="font-semibold">
                    <span>Rating:{" "}</span>
                    <span
                      className={`${
                        trip.status === "Completed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {userRating}/5
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
            <div className="flex flex-col justify-center p-4">
              {trip.status !== "Completed" && (new Date() > new Date(date.to)) && (
                <button
                  className="px-3 py-2 text-sm rounded-md bg-green-500 hover:bg-green-600 font-medium text-white transition-colors duration-200 hover:shadow-md"
                  onClick={handleFinish}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}