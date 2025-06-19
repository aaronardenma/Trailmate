import React, { useEffect, useState } from "react";
import { recommendGear } from "../utils/gearRecommendation";
import RecommendedGearList from "../components/RecommendedGearList";

// mock data - replace w API call later
const mockWeatherAPI = async (trailId, dateTime) => {
  return {
    temperatureC: 9,
    raining: trailId === "garibaldi" ? true : false,
    tripLengthDays: 1,
    difficulty: "hard",
  };
};

const TRAIL_OPTIONS = [
  { id: "garibaldi", name: "Garibaldi Lake" },
  { id: "elysian", name: "Elysian Trail" },
  { id: "joffre", name: "Joffre Lakes" },
];

export default function GearPlanner() {
  const [trailId, setTrailId] = useState("");
  const [dateTime, setDateTime] = useState("");
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

  const handleGenerateGear = async () => {
    if (!trailId || !dateTime) return;

    // API call
    const mockConditions = await mockWeatherAPI(trailId, dateTime);
    setConditions(mockConditions);

    const gear = recommendGear(mockConditions, ownedGear);
    setRecommendedGear(gear);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Trail Gear Planner</h1>

      <section className="space-y-4">
        <label className="flex flex-col">
          Select Trail:
          <select
            value={trailId}
            onChange={(e) => setTrailId(e.target.value)}
            className="border rounded px-2 py-1 mt-1"
          >
            <option value="">-- Choose a trail --</option>
            {TRAIL_OPTIONS.map((trail) => (
              <option key={trail.id} value={trail.id}>
                {trail.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Planned Date & Time:
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="border rounded px-2 py-1 mt-1"
          />
        </label>

        <button
          onClick={handleGenerateGear}
          className="bg-[#588157] text-white px-4 py-2 rounded hover:bg-[#476246] transition"
        >
          Generate Gear List
        </button>
      </section>

      {conditions && (
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Weather-Based Recommendations</h2>
          <ul className="text-sm text-gray-600 mb-4">
            <li><strong>Temperature:</strong> {conditions.temperatureC}°C</li>
            <li><strong>Raining:</strong> {conditions.raining ? "Yes" : "No"}</li>
            <li><strong>Trip Length:</strong> {conditions.tripLengthDays} day(s)</li>
            <li><strong>Difficulty:</strong> {conditions.difficulty}</li>
          </ul>

          <RecommendedGearList recommendedGear={recommendedGear} ownedGear={ownedGear} />
        </section>
      )}
    </div>
  );
}
