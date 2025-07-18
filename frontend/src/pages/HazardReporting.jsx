import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';

export default function ReportHazardPage({ tripId, trailId, userId, onClose }) {
    const lastEmitTime = useRef(0);
    const socket = useRef(null);

    const [hazardDetails, setHazardDetails] = useState({
        tripId: tripId || "",
        trailId: trailId || null,
        userId: userId || null,
        latitude: "",
        longitude: "",
        level: "low",
        type: "",
        comment: "",
        date: new Date().toISOString(),
    });

    const [userLocation, setUserLocation] = useState({
        latitude: null,
        longitude: null,
    });

    const [loading, setLoading] = useState(true);

    const watchLocation = () => {
        console.log("Starting to watch location");

        if (!navigator.geolocation) {
            console.warn("Geolocation not supported in this browser.");
            return;
        }

        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Location update:", latitude, longitude);

                const now = Date.now();
                if (now - lastEmitTime.current > 2000) {
                    if (socket.current && socket.current.connected) {
                        console.log("Emitting location to server");
                        socket.current.emit('send-location', { latitude, longitude });
                        lastEmitTime.current = now;
                    } else {
                        console.warn("Socket not connected yet; skipping emit");
                    }
                }

                setUserLocation({ latitude, longitude });
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching geolocation:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    };

    useEffect(() => {
        socket.current = io("http://localhost:5001");

        socket.current.on("connect", () => {
            console.log("Connected to socket with id:", socket.current.id);
            watchLocation();
        });

        socket.current.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        socket.current.on("receive-location", (data) => {
            const { id, latitude, longitude } = data;
            console.log(`Received location from ${id}:`, latitude, longitude);

            setUserLocation({ latitude, longitude });
            setLoading(false);

            setHazardDetails((prevDetails) => ({
                ...prevDetails,
                latitude,
                longitude,
            }));
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hazardDetails.trailId || !hazardDetails.userId) {
            alert("Trip information not provided. Please check inputs.");
            return;
        }

        try {
            const payload = {
                ...hazardDetails,
                latitude: parseFloat(hazardDetails.latitude),
                longitude: parseFloat(hazardDetails.longitude),
                date: new Date(hazardDetails.date).toISOString(),
            };

            const res = await fetch(`http://localhost:5001/api/hazards/add/`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert("Hazard reported successfully");

                setHazardDetails({
                    tripId: tripId || "",
                    trailId: trailId || null,
                    userId: userId || null,
                    latitude: "",
                    longitude: "",
                    level: "low",
                    type: "",
                    comment: "",
                    date: new Date().toISOString(),
                });

                onClose();
            } else {
                alert("Failed to report hazard");
            }
        } catch (err) {
            console.error("Error submitting hazard:", err);
            alert("Failed to report hazard");
        }
    };



    return (
        <div className="p-10">
            <h1 className="font-bold text-3xl mb-4">Report Hazard for Trail</h1>

            {loading ? (
                <div className="text-center py-4">
                    <p>Loading location...</p>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Latitude</label>
                        <input
                            type="number"
                            step="any"
                            value={hazardDetails.latitude || userLocation.latitude || ""}
                            onChange={(e) => setHazardDetails({ ...hazardDetails, latitude: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Longitude</label>
                        <input
                            type="number"
                            step="any"
                            value={hazardDetails.longitude || userLocation.longitude || ""}
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

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Submit Hazard
                    </button>

                </form>
            )}
        </div>
    );
}
