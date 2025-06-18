import { useParams } from "react-router-dom";
import trailData from "../data.json";
import LocationMap from "../components/LocationMap.jsx";
import PlanInputs from "../components/PlanInputs.jsx";

export default function TrailPage() {
    const { id } = useParams();
    const trail = trailData.find((trail) => trail.id === Number(id));

    if (!trail) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                Trail not found
            </div>
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
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center mt-4">
                <h1 className="mb-2 text-2xl font-bold">Plan your trip!</h1>
                <PlanInputs></PlanInputs>
                
            </div>
        </div>
    );
}
