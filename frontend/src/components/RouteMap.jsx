import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const GreenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const RouteMap = ({ trailLocation }) => {
    const { lat, lng } = trailLocation;
    const [currentLocation, setCurrentLocation]  = useState(() => {
        const stored = localStorage.getItem('currentLocation');
        return stored
            ? JSON.parse(stored)
            : { latitude: 49.261901341297744, longitude: -123.2494536190855 };
    });

    useEffect(() => {
        const getLocationFromStorage = () => {
            const stored = localStorage.getItem('currentLocation');
            if (stored) {
                try {
                    const { latitude, longitude } = JSON.parse(stored);
                    setCurrentLocation({ latitude, longitude });
                } catch (err) {
                    console.warn("Invalid currentLocation data:", err);
                }
            }
        };

        getLocationFromStorage();
        const intervalId = setInterval(getLocationFromStorage, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
                <Popup>Trail Location</Popup>
            </Marker>

            {currentLocation && (
                <Marker
                    position={[currentLocation.latitude, currentLocation.longitude]}
                    icon={GreenIcon}
                >
                    <Popup>Your Current Location</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default RouteMap;
