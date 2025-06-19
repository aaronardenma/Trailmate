import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LocationMap from "../components/LocationMap.jsx";

export default function TrailPage() {
    // const { id } = useParams();
    const id = '685325190e700877c9c4a244'
    const [trail, setTrail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrailData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/trails/getTrailById/${id}`);
                if (!response.ok) {
                    throw new Error('Trail not found');
                }
                const data = await response.json();
                setTrail(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchTrailData();
    }, [id]);

    if (loading) {
        return <div className="p-6 text-center text-gray-600">Loading...</div>;
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-600 font-semibold">
                {error}
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
                    <p><strong className="text-gray-800">Distance:</strong> <span className="text-gray-600">{trail.distance} miles</span></p>
                    <p><strong className="text-gray-800">Elevation:</strong> <span className="text-gray-600">{trail.elevation}</span></p>
                    <p><strong className="text-gray-800">Estimated Time:</strong> <span className="text-gray-600">{trail.time} minutes</span></p>
                    <p><strong className="text-gray-800">Location:</strong> <span className="text-gray-600">{trail.city}</span></p>
                    <p><strong className="text-gray-800">Coordinates:</strong> <span className="text-gray-600">{trail.latitude.toFixed(5)}, {trail.longitude.toFixed(5)}</span></p>
                </div>
            </div>
        </div>
    );
}
