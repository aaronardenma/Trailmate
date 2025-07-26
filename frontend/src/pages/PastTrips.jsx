import { useEffect, useState } from "react";
import TripCard from "@/components/TripCard";
import { useLocation, useNavigate } from "react-router-dom";

export default function PastTrips() {
  const [allTrips, setAllTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const location = useLocation();
  const navigate = useNavigate();
  const openTripId = location.state?.openTripId;

  const tabs = [
    { key: "Upcoming", label: "Upcoming", count: 0 },
    { key: "In Progress", label: "In Progress", count: 0 },
    { key: "Completed", label: "Completed", count: 0 }
  ];

  const getTripsForStatus = (status) => {
    return allTrips.filter(trip => trip.status === status);
  };

  tabs.forEach(tab => {
    tab.count = getTripsForStatus(tab.key).length;
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/trips/`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        setAllTrips(data.trips || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrips();
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
        setAllTrips((prevTrips) =>
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

  const renderTripCard = (trip) => {
    const cardProps = {
      key: trip._id,
      trip: trip,
      trail: trip.trailID,
      onDelete: handleDelete,
      defaultOpen: trip._id === openTripId
    };

    if (trip.status === "In Progress") {
      return (
        <div
          onClick={() => handleTripClick(trip._id)}
          className="cursor-pointer"
        >
          <TripCard {...cardProps} />
        </div>
      );
    }

    return <TripCard {...cardProps} />;
  };

  const currentTrips = getTripsForStatus(activeTab);

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <h2 className="mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold max-w-4xl text-center">
        Your Trips
      </h2>
      
      <div className="w-full max-w-4xl mb-4 sm:mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <div className="hidden sm:flex space-x-8 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 cursor-pointer font-medium text-md whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-[#588157] text-[#588157]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.key
                        ? "bg-[#bcd1ba] text-[#588157]"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex sm:hidden w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-3 px-2 border-b-2 cursor-pointer font-medium text-xs text-center ${
                    activeTab === tab.key
                      ? "border-[#588157] text-[#588157]"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="truncate max-w-full">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`px-1.5 py-0.5 text-xs rounded-full min-w-[20px] ${
                        activeTab === tab.key
                          ? "bg-[#bcd1ba] text-[#588157]"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-3 sm:space-y-5">
        {currentTrips.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 text-base sm:text-lg">
              No trips found.
            </p>
            {activeTab === "Upcoming" && (
              <p className="text-gray-500 text-sm mt-2">
                Plan your next adventure!
              </p>
            )}
          </div>
        ) : (
          currentTrips.map(renderTripCard)
        )}
      </div>
    </div>
  );
}