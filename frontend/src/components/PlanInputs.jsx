import { useState } from "react";
import { addDays } from "date-fns";
import { useParams } from "react-router-dom";
import PopoverCalendar from "./PopoverCalendar";

export default function PlanInputs() {
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

      const data = await res.json()

      if (res.ok && data.success) {
        console.log('trip created')
        
      } else {

      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="flex items-center" onSubmit={(e) => addTrip(e)}>
        <div className="flex flex-col text-right items-end max-w-md mr-4">
          <p className="mr-4 mb-4 whitespace-nowrap">
            I want to hike this trail on
          </p>
          <p className="mr-4 whitespace-nowrap">starting around</p>
        </div>
        <div className="flex flex-col items-left">
          <PopoverCalendar date={date} setDate={setDate} />
          <input
            className="outline mr-4"
            name="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          {/* <button
            className="ml-8 cursor-pointer outline rounded p-3 font-bold text-[#fff] bg-[#588157]"
            type="submit"
          >
            GO
          </button> */}
        </div>
      </form>
    </>
  );
}
