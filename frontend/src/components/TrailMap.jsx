import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    const [currentPosition, setCurrentPosition] = useState(() => {
        const stored = localStorage.getItem('currentLocation');
        return stored
            ? JSON.parse(stored)
            : { latitude: 49.261901341297744, longitude: -123.2494536190855 };
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const stored = localStorage.getItem('currentLocation');
            if (stored) {
                try {
                    const { latitude, longitude } = JSON.parse(stored);
                    setCurrentPosition({ latitude, longitude });
                } catch (err) {
                    console.warn('Invalid location data in localStorage:', err);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchHazards = async () => {
            if (!trail?._id) return;

            try {
                const res = await fetch(`http://localhost:5001/api/hazards/get/${trail._id}`);
                const data = await res.json();

                const now = new Date();
                const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

                const recentHazards = data.filter(hazard => {
                    if (!hazard.date) return false;
                    const hazardDate = new Date(hazard.date);
                    return hazardDate > oneDayAgo;
                });

                setHazards(recentHazards);
            } catch (err) {
                console.error("Error fetching hazards:", err);
            }
        };

        fetchHazards();
    }, [trail]);

    if (!trail || !trail.latitude || !trail.longitude) {
        return <p>Invalid trail data</p>;
    }

    const trailPosition = [trail.latitude, trail.longitude];

    return (
        <MapContainer center={trailPosition} zoom={14} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={trailPosition}>
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
