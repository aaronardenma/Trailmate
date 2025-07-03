import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { recommendGear } from "../utils/gearRecommendation";

export default function PlanTripPage() {
  const { _id } = useParams();
  const [date, setDate] = useState("");
  const [gearData, setGearData] = useState([]); 
  const [recommendedByCategory, setRecommendedByCategory] = useState({});
  const [tripStarted, setTripStarted] = useState(false);
  const [ownedGear, setOwnedGear] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("http://localhost:5001/api/users/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        const userData = await res.json();

        const nestedGear = {};
        (userData.gear || []).forEach(({ category, item }) => {
          if (!nestedGear[category]) nestedGear[category] = {};
          nestedGear[category][item] = true;
        });
        setOwnedGear(nestedGear);
      } catch (err) {
        console.error("Error fetching user data", err);
        setOwnedGear({});
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchGear() {
      try {
        const res = await fetch("http://localhost:5001/api/gear");
        const data = await res.json();
        setGearData(data);
      } catch (err) {
        console.error("Error fetching gear:", err);
      }
    }
    fetchGear();
  }, []);

  useEffect(() => {
    if (!date || gearData.length === 0) return;

    // Replace with real weather API later
    const conditions = {
      temperatureC: -3,
      raining: false,
      tripLengthDays: 2,
      difficulty: "hard",
    };

    const recs = recommendGear(conditions);
    
    const recommendedGrouped = {};

    gearData.forEach(({ category, items }) => {
      const recommendedItemsInCategory = items.filter(item => recs.includes(item));
      if (recommendedItemsInCategory.length > 0) {
        recommendedGrouped[category] = recommendedItemsInCategory;
      }
    });

    setRecommendedByCategory(recommendedGrouped);
  }, [date, gearData]);

  const userOwnsItem = (category, item) => {
    return !!ownedGear?.[category]?.[item];
  };

  const handleStartTrip = () => {
    if (!date) return alert("Please select a date for your trip.");
    navigate(`/trip/${_id}`);
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
            }}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-[#A3B18A]"
          />
        </div>

        {date && (
          <>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#4A4A4A] mb-2">Expected Weather</h2>
              <p className="text-gray-600 text-lg">❄️ Snowy</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#4A4A4A] mb-4">Gear Recommendations</h2>
              {Object.keys(recommendedByCategory).length > 0 ? (
                Object.entries(recommendedByCategory).map(([category, items]) => (
                  <div key={category} className="mb-4">
                    <h3 className="text-lg font-bold text-[#588157] mb-2">
                      {category.replace(/_/g, " and ")}
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {items.map((gear) => (
                        <li
                          key={gear}
                          className={`select-none ${
                            userOwnsItem(category, gear)
                              ? "text-black font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {gear} {userOwnsItem(category, gear) && "✓"}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Loading recommendations...</p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleStartTrip}
            className="bg-[#588157] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#476246] transition"
          >
            Start Trip
          </button>
        </div>

        {tripStarted && (
          <div className="text-center font-semibold text-lg" style={{ color: "#588157" }}>
            Your trip has started! Stay safe and enjoy the trail.
          </div>
        )}
      </div>
    </div>
  );
}
