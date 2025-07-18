import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ReportHazardPage() {
    const { trailId } = useParams();
    const [hazardDetails, setHazardDetails] = useState({
        latitude: "",
        longitude: "",
        level: "low",
        type: "",
        comment: "",
        date: new Date(),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5001/api/hazards/add/`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hazardDetails),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                alert("Hazard reported successfully");
            } else {
                alert("Error reporting hazard");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to report hazard");
        }
    };

    return (
        <div className="p-10">
            <h1 className="font-bold text-3xl mb-4">Report Hazard for Trail</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Latitude</label>
                    <input
                        type="number"
                        value={hazardDetails.latitude}
                        onChange={(e) => setHazardDetails({ ...hazardDetails, latitude: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Longitude</label>
                    <input
                        type="number"
                        value={hazardDetails.longitude}
                        onChange={(e) => setHazardDetails({ ...hazardDetails, longitude: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hazard Level</label>
                    <select
                        value={hazardDetails.level}
                        onChange={(e) => setHazardDetails({ ...hazardDetails, level: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hazard Type</label>
                    <input
                        type="text"
                        value={hazardDetails.type}
                        onChange={(e) => setHazardDetails({ ...hazardDetails, type: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                        value={hazardDetails.comment}
                        onChange={(e) => setHazardDetails({ ...hazardDetails, comment: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Submit Hazard
                </button>
            </form>
        </div>
    );
}
