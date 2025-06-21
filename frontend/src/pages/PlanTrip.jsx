import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recommendGear } from "../utils/gearRecommendation";

export default function PlanTripPage() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [tripStarted, setTripStarted] = useState(false);
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

  const mockWeatherAPI = async (trailId, dateTime) => {
    return {
      temperatureC: 9,
      raining: false,
      tripLengthDays: 1,
      difficulty: "hard",
    };
  };

  const handleStartTrip = async () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    const dateObj = new Date(date);
    const [hours, minutes] = time.split(":");
    dateObj.setHours(Number(hours));
    dateObj.setMinutes(Number(minutes));

    const weather = await mockWeatherAPI(_id, dateObj.toISOString());
    setConditions(weather);

    const gear = recommendGear(weather, ownedGear);
    setRecommendedGear(gear);

    setTripStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ECECEC] to-[#F5F5F5] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-[#2F4F4F]">Plan Your Trip</h1>

        <div className="flex flex-col gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Select your trip date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTripStarted(false);
              setConditions(null);
              setRecommendedGear([]);
            }}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartTrip}
            className="bg-[#A3B18A] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#859966] transition"
          >
            Start Trip
          </button>
        </div>

        {conditions && (
          <div className="space-y-6 mt-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#4A4A4A] mb-2">Weather</h2>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Temperature:</strong> {conditions.temperatureC}°C</li>
                <li><strong>Raining:</strong> {conditions.raining ? "Yes" : "No"}</li>
                <li><strong>Trip Length:</strong> {conditions.tripLengthDays} day(s)</li>
                <li><strong>Difficulty:</strong> {conditions.difficulty}</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#4A4A4A] mb-4">Recommended Gear</h2>
              {recommendedGear.length === 0 ? (
                <p className="text-gray-600">You're fully equipped! ✅</p>
              ) : (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {recommendedGear.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {tripStarted && (
          <div className="text-center text-green-700 font-semibold text-lg">
            Your trip has started! Stay safe and enjoy the trail.
          </div>
        )}
      </div>
    </div>
  );
}
