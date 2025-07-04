import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import LocationMap from "./LocationMap.jsx";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { addDays, set } from "date-fns";
import TrailInfo from "./TrailInfo.jsx";
import TrailPlanResults from "./TrailPlanResults.jsx";
import { useNavigate } from "react-router-dom";


export default function TrailDialog({ trigger, trailId, favorite, setFavorite}) {
  const [trail, setTrail] = useState(null);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const [time, setTime] = useState("12:00");
  const [planning, setPlanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedTripId, setSavedTripId] = useState(null);
  const nav = useNavigate()

  useEffect(() => {
    if (!trailId) return;

    const fetchTrailData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/trails/getTrailById/${trailId}`
        );
        if (!response.ok) throw new Error("Failed to fetch trail data");
        const data = await response.json();
        setTrail(data);

        const favRes = await fetch(
          `http://localhost:5001/api/favorite/isFavorite`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trailID: trailId }),
          }
        );
        if (favRes.status === 404) {
          setFavorite(false);
        } else {
          const favData = await favRes.json();
          setFavorite(favData.isFavorite);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrailData();
  }, [trailId]);

  const handleFavorite = async () => {
    if (favorite) {
      setFavorite(false);
      try {
        await fetch("http://localhost:5001/api/favorite/deleteFavorite", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trailID: trailId }),
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
          body: JSON.stringify({ trailID: trailId }),
        });
      } catch (err) {
        setFavorite((fav) => !fav);
        alert("Error updating favorite: " + err.message);
      }
    }
  };

  const saveTrip = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5001/api/trips/saveTrip", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trailID: trailId,
          startDate: date.from,
          endDate: date.to,
          time: time,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSavedTripId(data.tripId);
        alert("Trip saved successfully!");
        nav('/profile/trips')
      } else {
        alert("Failed to save trip. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving trip: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startTrip = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5001/api/trips/startTrip", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trailID: trailId,
          startDate: date.from,
          endDate: date.to,
          time: time,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Trip started successfully! Have a great hike!");
        nav(`/trip/${data.tripId}`)

      } else {
        alert("Failed to start trip. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error starting trip: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTripSubmission = async (e) => {
    e.preventDefault();
    setPlanning(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent 
        className="max-w-[calc(100%-2rem)] sm:max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto"
        showBackButton={planning}
        onBackClick={() => setPlanning(false)}
      >
        <DialogHeader className="px-6">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleFavorite}
                className="text-2xl p-2 rounded-full hover:bg-gray-100 hover:scale-110 duration-300 mr-2 cursor-pointer"
              >
                {favorite ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar className="text-gray-400" />
                )}
              </button>
              <h1 className="text-3xl font-bold">{trail?.name}</h1>
              
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <DialogDescription />
        
        {planning ? (
          <TrailPlanResults
            trail={trail}
            date={date}
            time={time}
            saveTrip={saveTrip}
            startTrip={startTrip}
          />
        ) : (
          <TrailInfo
            trail={trail}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            setPlanning={setPlanning}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
