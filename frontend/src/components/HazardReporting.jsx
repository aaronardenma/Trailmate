import { useState, useEffect } from "react";
import Toastify from "toastify-js";

export default function HazardReporting() {
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState("default");
  const [hazardDescription, setHazardDescription] = useState("");

  const [location, setLocation] = useState({
    latitude: 49.261901341297744,
    longitude: -123.2494536190855,
  });

  const fetchTrails = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/trails/getTrails");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setTrails(data);

      if (data.length > 0 && data[0].latitude && data[0].longitude) {
        setLocation({
          latitude: data[0].latitude,
          longitude: data[0].longitude,
        });
        setSelectedTrail(data[0]._id);
      }

    } catch (err) {
      console.error("Error fetching trails:", err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("currentLocation");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.latitude && parsed.longitude) {
          setLocation(parsed);
          return;
        }
      } catch (err) {
        console.warn("Invalid currentLocation in localStorage:", err);
      }
    }

    fetchTrails();
  }, []);

  useEffect(() => {
    if (selectedTrail === "default") return;
    const selected = trails.find((trail) => trail._id === selectedTrail);
    if (selected && selected.latitude && selected.longitude) {
      setLocation({
        latitude: selected.latitude,
        longitude: selected.longitude,
      });
    }
  }, [selectedTrail, trails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trail ID:", selectedTrail);
    console.log("Description:", hazardDescription);
    console.log("Latitude:", location.latitude);
    console.log("Longitude:", location.longitude);

    Toastify({
      text: "Hazard reported successfully!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  return (
      <div className="flex flex-col items-center">
        <h1>Report a Hazard</h1>
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-2"
        >
          <select
              name="trail"
              value={selectedTrail}
              onChange={(e) => setSelectedTrail(e.target.value)}
          >
            <option disabled value="default">
              Select trail
            </option>
            {trails.map((trail) => (
                <option key={trail._id} value={trail._id}>
                  {trail.name}
                </option>
            ))}
          </select>
          <input
              type="text"
              name="description"
              value={hazardDescription}
              onChange={(e) => setHazardDescription(e.target.value)}
              placeholder="Enter description..."
              className="outline p-2"
          />
          <button type="submit" className="outline rounded p-1">
            Report
          </button>
        </form>
      </div>
  );
}
