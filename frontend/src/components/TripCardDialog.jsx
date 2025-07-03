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

export default function TripCardDialog({ trip, trigger, date, setDate, status, setStatus, open, onOpenChange }) {
  const [favorite, setFavorite] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [time, setTime] = useState('12:00')
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


  const handleUpdateTrip = async () => {
    console.log("updated trip")
    if (!updating) {
      setUpdating(true)
    } else {
      try {
        const res = await fetch('http://localhost:5001/api/trips/update', {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify({
            startDate: date.from,
            endDate: date.to,
            time: time
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleFinishTrip = async () => {
    console.log("finished trip")
    nav(`/trip/${trip._id}`)
    
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <TripDialogContent trip={trip} updating={updating} date={date} setDate={setDate} time={time} setTime={setTime} />
      <DialogFooter className={`flex ${trip.status !== 'Completed' ? 'justify-between' : 'justify-end'}`}>
          <button
            className="w-fit bg-[#DAD7CD] text-black font-bold py-3 px-6 rounded-md hover:bg-[#E5E3DB] transition-colors cursor-pointer disabled:opacity-50"
            onClick={handleUpdateTrip}
          >
            Update
          </button>
          {trip.status !== "Completed" && (
            <DialogClose asChild>
              <button
                className="w-fit bg-[#588157] text-white font-bold py-3 px-6 rounded-md hover:bg-[#4a6e49] transition-colors cursor-pointer disabled:opacity-50"
                onClick={handleFinishTrip}
              >
                Finish
              </button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
