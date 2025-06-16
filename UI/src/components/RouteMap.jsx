import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

const RouteMap = ({ from, to }) => {
    const RoutingControl = () => {
        const map = useMap();

        useEffect(() => {
            if (!map) return;

            const routingControl = L.Routing.control({
                waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
                routeWhileDragging: false,
            }).addTo(map);

            return () => map.removeControl(routingControl);
        }, [map, from, to]);

        return null;
    };

    return (
        <MapContainer center={[from.lat, from.lng]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RoutingControl />
        </MapContainer>
    );
};

export default RouteMap;
