import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const RedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const GreenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const TrailMap = ({ trail }) => {
    const [hazards, setHazards] = useState([]);
    const socket = useRef(null);
    const lastEmitTime = useRef(0);
    const [currentPosition, setCurrentPosition] = useState(null);

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
        console.log("Initializing map and socket");

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
            setCurrentPosition({ latitude, longitude });
            console.log(`Received location from ${id}:`, latitude, longitude);
        });
    }, []);

    useEffect(() => {
        const fetchHazards = async () => {
            if (!trail?._id) return;

            try {
                const res = await fetch(`http://localhost:5001/api/hazards/get/${trail._id}`);
                const data = await res.json();
                console.log("Fetched hazards:", data);
                setHazards(data);
            } catch (err) {
                console.error("Error fetching hazards:", err);
            }
        };

        fetchHazards();
    }, [trail]);

    if (!trail || !trail.latitude || !trail.longitude) {
        return <p>Invalid trail data</p>;
    }

    const position = [trail.latitude, trail.longitude];

    return (
        <MapContainer center={position} zoom={14} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
                <Popup>
                    <div style={{ maxWidth: 200 }}>
                        <h3>{trail.name}</h3>
                        <img
                            src={trail.photoUrl}
                            alt={trail.name}
                            style={{ width: '100%', borderRadius: '4px', marginBottom: '0.5rem' }}
                        />
                        <p><strong>Location:</strong> {trail.location}</p>
                        <p><strong>Distance:</strong> {trail.distanceKm} km</p>
                        <p><strong>Elevation:</strong> {trail.avgElevationM} m</p>
                        <p><strong>Difficulty:</strong> {trail.difficulty}</p>
                        <p style={{ fontSize: '0.85em' }}>{trail.description}</p>
                    </div>
                </Popup>
            </Marker>

            {hazards.map((hazard, i) => (
                hazard.latitude && hazard.longitude && (
                    <Marker
                        key={hazard._id || i}
                        position={[hazard.latitude, hazard.longitude]}
                        icon={RedIcon}
                    >
                        <Popup>
                            <strong>Hazard:</strong> {hazard.type || 'Unknown hazard'}
                        </Popup>
                    </Marker>
                )
            ))}

            {currentPosition && (
                <Marker
                    position={[currentPosition.latitude, currentPosition.longitude]}
                    icon={GreenIcon}
                >
                    <Popup>
                        <strong>Your Current Position</strong>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default TrailMap;
