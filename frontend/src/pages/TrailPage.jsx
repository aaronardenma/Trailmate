import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LocationMap from "../components/LocationMap.jsx";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { addDays } from "date-fns";
import PopoverCalendar from "@/components/PopoverCalendar.jsx";

export default function TrailPage() {
  const { id } = useParams();
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const { _id } = useParams();
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const [time, setTime] = useState("12:00");

  const addTrip = async (e) => {
    e.preventDefault();
    console.log(typeof e.target["time"].value);
    console.log(e.target["time"].value);

    try {
      // TODO: send planned trail date/time to backend
      const res = await fetch("localhost:5001/api/trips/addTrip", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          trailID: _id,
          startDate: date.from,
          endDate: date.to,
          time: time,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        console.log("trip created");
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchTrailData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/trails/getTrailById/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch trail data");
        const data = await response.json();
        setTrail(data);
        setLoading(false);

        const favRes = await fetch(
          `http://localhost:5001/api/favorite/isFavorite`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trailID: id }),
          }
        );
        if (favRes.status === 404) {
          setFavorite(false);
        } else {
          const favData = await favRes.json();
          setFavorite(favData.isFavorite);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTrailData();
  }, [id]);

  const handleFavorite = async () => {
    if (favorite) {
      setFavorite(false);
      try {
        await fetch("http://localhost:5001/api/favorite/deleteFavorite", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trailID: id }),
        });
      } catch (err) {
        setFavorite((fav) => !fav);
        alert("Error updating favorite: " + err.message);
      }
    } else {
      setFavorite(true);
      try {
        await fetch("http://localhost:5001/api/favorite/addFavorite", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trailID: id }),
        });
      } catch (err) {
        setFavorite((fav) => !fav);
        alert("Error updating favorite: " + err.message);
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  return (
    <div className="p-10 min-h-screen">
      {/* Title spans full width */}
      <h1 className="font-bold text-4xl mb-8">{trail.name}</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* First Column - Trail Info */}
        <div className="flex flex-col">
          <div className="flex flex-col items-start mb-6">
            <div className="max-w-lg">
              <img
                src={trail.photoUrl}
                alt={trail.name}
                className="w-full rounded-xl shadow-lg object-cover border border-gray-300 mb-2 max-h-80"
              />
              <p className="text-center text-gray-600">{trail.location}</p>
            </div>
          </div>

          <div className="ml-8 space-y-3">
            <p className="text-lg">
              <span className="font-bold">Difficulty: </span>
              <span className="text-gray-600">{trail.difficulty}</span>
            </p>
            <p className="text-lg">
              <span className="font-bold">Distance: </span>
              <span className="text-gray-600">{trail.distanceKm} km</span>
            </p>
            <p className="text-lg">
              <span className="font-bold">Elevation: </span>
              <span className="text-gray-600">{trail.avgElevationM} m</span>
            </p>
          </div>
        </div>

        {/* Second Column - Form and Description */}
        <div className="flex flex-col mt-10 h-full">
          {/* Form Section - aligned to start where image starts */}
          <div className="mb-8 space-y-4">
            {/* <div className="bg-gray-50 p-6 rounded-lg border"> */}
            {/* <h3 className="font-semibold text-lg mb-4">Plan Your Hike</h3> */}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select dates:
                </label>
                <PopoverCalendar date={date} setDate={setDate} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting time:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  name="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            {/* </div> */}
          </div>

          {/* Description Section */}
          <div className="flex-1">
            {/* <h3 className="font-semibold text-lg mb-3">About This Trail</h3> */}
            <p className="text-gray-700 leading-relaxed">{trail.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="w-fit bg-[#588157] text-white font-bold py-3 px-6 rounded-md hover:bg-[#4a6e49] transition-colors"
          type="submit"
        >
          GO
        </button>
      </div>
    </div>
  );
}
