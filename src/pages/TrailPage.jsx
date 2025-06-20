import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import trailData from "../data.json";
import LocationMap from "../components/LocationMap";
import PlanInputs from "../components/PlanInputs";
import RecommendedGearList from "../components/RecommendedGearList";
import { recommendGear } from "../utils/gearRecommendation";

const mockWeatherAPI = async (trailId, dateTime) => {
  return {
    temperatureC: 9,
    raining: false,
    tripLengthDays: 1,
    difficulty: "hard",
  };
};

export default function TrailPage() {
  const { id } = useParams();
  const trail = trailData.find((trail) => trail.id === Number(id));

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [time, setTime] = useState("12:00");
  const [conditions, setConditions] = useState(null);
  const [recommendedGear, setRecommendedGear] = useState([]);
  const [ownedGear, setOwnedGear] = useState({});

  useEffect(() => {
    try {
      const gear = JSON.parse(localStorage.getItem("ownedGear")) || {};
      setOwnedGear(gear);
    } catch {
      setOwnedGear({});
    }
  }, []);

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    if (!trail) return;

    const plannedDate = new Date(dateRange.from);
    const [hours, minutes] = time.split(":");
    plannedDate.setHours(+hours);
    plannedDate.setMinutes(+minutes);

    const mockConditions = await mockWeatherAPI(trail.id.toString(), plannedDate.toISOString());
    setConditions(mockConditions);

    const gear = recommendGear(mockConditions, ownedGear);
    setRecommendedGear(gear);
  };

  if (!trail) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">Trail not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DAD7CD] py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold text-[#2F4F4F] text-center">
          {trail.name}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={trail.photoUrl}
            alt={trail.name}
            className="lg:w-1/2 w-full rounded-lg shadow-lg object-cover max-h-[400px]"
          />
          <div className="lg:w-1/2 h-[400px] rounded-lg shadow-lg overflow-hidden">
            <LocationMap
              location={{ lat: trail.latitude, lng: trail.longitude }}
              name={trail.name}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 border border-gray-200">
          <p className="text-gray-700 leading-relaxed text-lg">{trail.description}</p>
          <p><strong className="text-gray-800">Distance:</strong> <span className="text-gray-600">{trail.distanceKm} km</span></p>
          <p><strong className="text-gray-800">Elevation:</strong> <span className="text-gray-600">{trail.avgElevationM} m</span></p>
          <p><strong className="text-gray-800">Estimated Time:</strong> <span className="text-gray-600">{trail.timeMinutes} minutes</span></p>
          <p><strong className="text-gray-800">Location:</strong> <span className="text-gray-600">{trail.location}</span></p>
          <p><strong className="text-gray-800">Coordinates:</strong> <span className="text-gray-600">{trail.latitude.toFixed(5)}, {trail.longitude.toFixed(5)}</span></p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4">Plan Your Trip</h2>

        <PlanInputs
          dateRange={dateRange}
          setDateRange={setDateRange}
          time={time}
          setTime={setTime}
          handleSubmit={handlePlanSubmit}
        />

        {conditions && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Weather-Based Recommendations</h3>
            <ul className="text-sm text-gray-600 mb-4">
              <li><strong>Temperature:</strong> {conditions.temperatureC}°C</li>
              <li><strong>Raining:</strong> {conditions.raining ? "Yes" : "No"}</li>
              <li><strong>Trip Length:</strong> {conditions.tripLengthDays} day(s)</li>
              <li><strong>Difficulty:</strong> {conditions.difficulty}</li>
            </ul>
            <RecommendedGearList recommendedGear={recommendedGear} ownedGear={ownedGear} />
          </div>
        )}
      </div>
    </div>
  );
}
