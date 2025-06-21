import {useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import PlanInputs from "@/components/PlanInputs";

export default function PlanTripPage() {
    const { _id } = useParams();
    const [date, setDate] = useState("");
    const [tripStarted, setTripStarted] = useState(false);
    const navigate = useNavigate();

    const handleStartTrip = () => {
        if (!date) {
            alert("Please select a date for your trip.");
        }
        navigate(`/trip/${_id}`);
        setTripStarted(true);
    };

    const gearRecommendations = [
        "Insulated hiking boots",
        "Thermal jacket",
        "Snow pants",
        "Gloves and beanie",
        "Trekking poles",
        "Waterproof backpack",
        "Emergency blanket",
        "Headlamp with extra batteries"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#ECECEC] to-[#F5F5F5] py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-[#2F4F4F]">Plan Your Trip</h1>
                {/* <PlanInputs className="flex items-center" ></PlanInputs> */}
                <div className="flex flex-col gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Select your trip date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            setTripStarted(false); // reset trip started if date changes
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
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {gearRecommendations.map((gear, index) => (
                                    <li key={index}>{gear}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <div className="flex justify-center">
                    <button
                        onClick={handleStartTrip}
                        className="bg-[#A3B18A] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#859966] transition"
                    >
                        Start Trip
                    </button>
                </div>

                {tripStarted && (
                    <div className="text-center text-green-700 font-semibold text-lg">
                        Your trip has started! Stay safe and enjoy the trail.
                    </div>
                )}
            </div>
        </div>
    );
}