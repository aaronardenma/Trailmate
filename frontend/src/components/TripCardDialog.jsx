import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { FaRegStar, FaStar } from "react-icons/fa";
import TripDialogContent from "./TripDialogContent"
import { useNavigate } from "react-router-dom";
import {getCombinedDateTime} from "../utils/datetime"
import { fetchWeather } from "../utils/weatherAPI.js";
import { recommendGear } from "../utils/gearRecommendation";

export default function TripCardDialog({ trip, date, setDate, userRating, setUserRating, trigger, open, onOpenChange }) {
  const [time, setTime] = useState(trip.time)
  const [userComments, setUserComments] = useState(trip.userComments)

  const [favorite, setFavorite] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [weather, setWeather] = useState(null);
  const [gearData, setGearData] = useState([]);
  const [ownedGear, setOwnedGear] = useState({});
  const [recommendedByCategory, setRecommendedByCategory] = useState({});

  const trail = trip.trailID
  const nav = useNavigate()

  useEffect(() => {
    const getFavoriteStatus = async () => {
      const res = await fetch(
          `http://localhost:5001/api/favorite/isFavorite`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trailID: trip.trailID._id }),
          }
        );
        if (res.status === 404) {
          setFavorite(false);
        } else {
          const favData = await res.json();
          setFavorite(favData.isFavorite);
        }
    }
    getFavoriteStatus()
  }, [])

  const handleFavorite = async () => {
    if (favorite) {
      setFavorite(false);
      try {
        await fetch("http://localhost:5001/api/favorite/deleteFavorite", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trailID: trip.trailID._id }),
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
          body: JSON.stringify({ trailID: trip.trailID._id }),
        });
      } catch (err) {
        setFavorite((fav) => !fav);
        alert("Error updating favorite: " + err.message);
      }
    }
  };

  useEffect(() => {
      if (!trail || !trail.latitude || !trail.longitude || !date?.from) return;
      const fetchWeatherForDate = async () => {
        const weatherData = await fetchWeather(trail.latitude, trail.longitude, new Date(date.from));
        setWeather(weatherData);
      };
    
      fetchWeatherForDate();
    }, [date?.from]);  
  
    useEffect(() => {
      async function fetchGear() {
        try {
          const res = await fetch("http://localhost:5001/api/gear");
          const data = await res.json();
          setGearData(data);
        } catch (err) {
          console.error("Error fetching gear:", err);
        }
      }
      fetchGear();
    }, []);
    
    useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("http://localhost:5001/api/users/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        const userData = await res.json();

        const nestedGear = {};
        (userData.gear || []).forEach(({ category, item }) => {
          if (!nestedGear[category]) nestedGear[category] = {};
          nestedGear[category][item] = true;
        });
        setOwnedGear(nestedGear);
      } catch (err) {
        console.error("Error fetching user data", err);
        setOwnedGear({});
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (
      !weather ||
      gearData.length === 0 ||
      !trail ||
      !date ||
      !date.to ||
      !date.from
    )
      return;
  
    const conditions = {
      temperatureC: weather.temperatureC,
      raining: weather.raining,
      tripLengthDays: Math.max(1, Math.ceil((date.to - date.from) / (1000 * 60 * 60 * 24))),
      difficulty: trail.difficulty,
    };
  
    const recs = recommendGear(conditions);
  
    const grouped = {};
    gearData.forEach(({ category, items }) => {
      const recommendedItems = items.filter(item => recs.includes(item));
      if (recommendedItems.length > 0) {
        grouped[category] = recommendedItems;
      }
    });
  
    setRecommendedByCategory(grouped);
  }, [weather, gearData, trail, date?.to, date?.from]);  

  const handleUpdateTrip = async () => {
    console.log("updated trip")
    if (!updating) {
      setUpdating(true)
    } else {
      try {
        const combinedDateTime = getCombinedDateTime(date.from, time);
        const isInPast = combinedDateTime && combinedDateTime < new Date();
        if (trip.status !== "Completed" && isInPast) {
          alert("Invalid start date")
          setDate({from: trip.startDate, to:trip.endDate})
          setTime(trip.time)
          return
        }
        const res = await fetch(`http://localhost:5001/api/trips/update/${trip._id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            startDate: (trip.status === "Completed") ? trip.startDate : date.from,
            endDate: (trip.status === "Completed") ? trip.endDate : date.to,
            time: (trip.status === "Completed") ? trip.time : time,
            userRating: userRating,
            userComments: userComments
          })
        })

        const data = await res.json()

        if (data.success && res.ok) {

          setUpdating(false);
        } else {
          throw new Error('Could not update trip details')
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleStartTrip = async () => {
    console.log("trip started")
    nav(`/trip/${trip._id}`)

  }

  const handleFinishTrip = async () => {
    console.log("finished trip")
    nav(`/tripFeedback/${trip._id}`)
  }
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
    if (!isOpen) {
      setTimeout(() => {
        setUpdating(false);
        setTime(trip.time);
        setUserComments(trip.userComments);
      }, 300); 
    }
    onOpenChange(isOpen);
  }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold mr-2">{trip.trailID.name}</h1>
              <button
                onClick={handleFavorite}
                className="text-2xl p-2 rounded-full hover:bg-gray-100 hover:scale-110 duration-300 cursor-pointer"
              >
                {favorite ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar />
                )}
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <TripDialogContent trip={trip} updating={updating} date={date} setDate={setDate} time={time} setTime={setTime} 
        userRating={userRating} setUserRating={setUserRating} userComments={userComments} setUserComments={setUserComments}
        weather={weather} recommendedByCategory={recommendedByCategory} ownedGear={ownedGear} />
      <DialogFooter className={`flex ${trip.status !== 'Completed' ? 'justify-between' : 'justify-end'}`}>
          <button
            className="w-fit bg-[#DAD7CD] text-black font-bold py-3 px-6 rounded-md hover:bg-[#E5E3DB] transition-colors cursor-pointer disabled:opacity-50"
            onClick={handleUpdateTrip}
          >
            Update
          </button>
          {/* {trip.status === "Upcoming" && !updating && (new Date() >= new Date(date.from)) && (
            <DialogClose asChild>
              <button
                className="w-fit bg-[#588157] text-white font-bold py-3 px-6 rounded-md hover:bg-[#4a6e49] transition-colors cursor-pointer disabled:opacity-50"
                onClick={handleStartTrip}
              >
                Start a Trip
              </button>

              <button
                className="w-fit bg-[#588157] text-white font-bold py-3 px-6 rounded-md hover:bg-[#4a6e49] transition-colors cursor-pointer disabled:opacity-50"
                onClick={handleFinishTrip}
              >
                Finish
              </button>
            </DialogClose>
          )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
