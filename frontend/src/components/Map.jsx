import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';

const Map = () => {

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const socket = useRef(null);
    const markers = useRef({});

    const lastEmitTime = useRef(0);

    const watchLocation = () => {
        console.log("Starting to watch location");

        if (!navigator.geolocation) {
            console.warn(" Geolocation not supported in this browser.");
            return;
        }

        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(" Location update:", latitude, longitude);

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
                console.error(' Error fetching geolocation:', error);
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

        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current).setView([0, 0], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(mapInstance.current);
            console.log("Map initialized");
        }

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

            mapInstance.current.setView([latitude, longitude], 16);

            if (markers.current[id]) {
                markers.current[id].setLatLng([latitude, longitude]);
            } else {
                markers.current[id] = L.marker([latitude, longitude]).addTo(mapInstance.current);
            }
        });

        // socket.current.on("user-disconnected", (id) => {
        //     console.log(`User disconnected: ${id}`);
        //     if (markers.current[id]) {
        //         mapInstance.current.removeLayer(markers.current[id]);
        //         delete markers.current[id];
        //     }
        // });

        return () => {
            console.log("Cleaning up socket and markers");
            // if (socket.current) {
            //     socket.current.off("connect");
            //     socket.current.off("connect_error");
            //     socket.current.off("receive-location");
            //     socket.current.off("user-disconnected");
            //     socket.current.disconnect();
            // }

            Object.keys(markers.current).forEach((id) => {
                mapInstance.current.removeLayer(markers.current[id]);
            });
            markers.current = {};
        };
    }, []);

    return <div id="map" ref={mapRef} style={{ height: '100vh', width: '100%' }}></div>;
};

export default Map;
