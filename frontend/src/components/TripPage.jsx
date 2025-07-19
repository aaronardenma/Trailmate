import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrailMap from "../components/TrailMap";
import ReportHazardPage from "@/pages/HazardReporting.jsx";

export default function TripPage() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trail, setTrail] = useState(null);
    const [showHazardReport, setShowHazardReport] = useState(false);

    useEffect(() => {
        const fetchTripAndTrail = async () => {
            try {
                setLoading(true);
                const tripRes = await fetch(`http://localhost:5001/api/trips/${tripId}`, {
                    credentials: "include",
                });
                if (!tripRes.ok) throw new Error("Failed to fetch trip");
                const tripData = await tripRes.json();
                setTrip(tripData.trip);

                const trailRes = await fetch(`http://localhost:5001/api/trails/getTrailById/${tripData.trip.trailID}`);
                if (!trailRes.ok) throw new Error("Failed to fetch trail");
                const trailData = await trailRes.json();
                setTrail(trailData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (tripId) fetchTripAndTrail();
    }, [tripId]);


    const handleFinishTrip = () => {
        navigate("/");
    };

    const handleReportHazard = () => {
        setShowHazardReport(true);
    };

    const onHazardReported = () => {
        setShowHazardReport(false);
    };

    if (loading) {
        return <div className="px-6 py-8 text-lg">Loading trip data...</div>;
    }

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    return (
        <div className="grid md:grid-cols-2 gap-12 px-6 py-8">
            {!showHazardReport && (
                <div className="h-[500px] rounded-lg shadow-md overflow-hidden border">
                    <TrailMap trail={trail} />
                </div>
            )}

            <div className="flex flex-col space-y-6">
                <div className="flex items-center space-x-6">
                    <img
                        src={trail.photoUrl}
                        alt={trail.name}
                        className="w-32 h-24 rounded-lg object-cover shadow-md"
                    />
                    <div>
                        <h2 className="text-3xl font-bold">{trail.name}</h2>
                        <p className="text-gray-600">{trail.location}</p>
                        <p className="mt-1 text-sm italic text-gray-700 max-w-md">{trail.description}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                    <h3 className="text-xl font-semibold mb-3">Trip Details</h3>
                    <p>
                        <span className="font-semibold">Start Date:</span> {formatDate(trip.startDate)}
                    </p>
                    <p>
                        <span className="font-semibold">End Date:</span> {formatDate(trip.endDate)}
                    </p>
                    <p>
                        <span className="font-semibold">Status:</span> {trip.status}
                    </p>
                    <p>
                        <span className="font-semibold">Time:</span> {trip.time}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                    <h3 className="text-xl font-semibold mb-3">Trail Details</h3>
                    <p>
                        <span className="font-semibold">Difficulty:</span> {trail.difficulty}
                    </p>
                    <p>
                        <span className="font-semibold">Distance:</span> {trail.distanceKm} km
                    </p>
                    <p>
                        <span className="font-semibold">Average Elevation:</span> {trail.avgElevationM} m
                    </p>
                </div>

                <div className="flex space-x-4 pt-2">
                    <button
                        className="bg-red-600 text-white font-bold py-2 px-5 rounded-md hover:bg-red-700 transition"
                        onClick={handleReportHazard}
                    >
                        Report a Hazard
                    </button>
                    <button
                        className="bg-green-700 text-white font-bold py-2 px-5 rounded-md hover:bg-green-800 transition"
                        onClick={handleFinishTrip}
                    >
                        Finish Trip
                    </button>
                </div>
            </div>
            {/*{hazards && hazards.length > 0 && (*/}
            {/*    <div className="bg-yellow-50 p-4 rounded-md shadow-inner">*/}
            {/*        <h3 className="text-xl font-semibold mb-3">Reported Hazards</h3>*/}
            {/*        <ul className="list-disc pl-5 space-y-1">*/}
            {/*            {hazards.map((hazard, index) => (*/}
            {/*                <li key={index}>*/}
            {/*                    <span className="font-semibold">{hazard.type}</span>: {hazard.description}*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}

            {showHazardReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowHazardReport(false)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        <ReportHazardPage
                            tripId={trip._id}
                            trailId={trip.trailID}
                            userId={trip.userId}
                            onClose={onHazardReported}
                        />
                    </div>
                </div>

            )}
        </div>
    );
}
