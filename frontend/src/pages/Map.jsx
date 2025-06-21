import React from 'react';
import RouteMap from '../components/RouteMap';

function Map() {
    const start = { lat: 49.261901341297744, lng:-123.24943216141371};
    const end = { lat: 49.29628229132264, lng: -123.12757150373955 };
    return (
        <div>
            <h1>Route Map to Trail</h1>
            <RouteMap from={start} to={end} />
        </div>
    );
}

export default Map;
