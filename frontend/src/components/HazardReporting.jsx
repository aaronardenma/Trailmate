import { useState, useEffect } from "react";
import Toastify from "toastify-js";

export default function HazardReporting() {
  const [trails, setTrails] = useState([]);
  const [selectedTrail, setSelectedTrail] = useState("default");
  const [hazardDescription, setHazardDescription] = useState("");

  const fetchTrails = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/trails/getTrails");
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setTrails(data);
    } catch (err) {
      console.error("Error fetching trails:", err);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  };

  const handleSubmit = (e) => {
    // handleGetLocation()
    e.preventDefault();

    console.log("working");
    console.log(selectedTrail);
    console.log(hazardDescription);
    handleGetLocation();
    // TODO: integrate post call to hazard model

    Toastify({
      text: "This is a toast",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Report a Hazard</h1>
      <form
        action="
        "
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center space-y-2"
      >
        <select
          name="trail"
          value={selectedTrail}
          id=""
          onChange={(e) => setSelectedTrail(e.target.value)}
        >
          <option disabled value={"default"}>
            Select trail
          </option>
          {trails.length !== 0 &&
            trails.map((trail) => (
              <option value={trail._id}>{trail.name}</option>
            ))}
        </select>
        <input
          type="text-area"
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
