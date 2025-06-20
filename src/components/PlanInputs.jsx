import { useState } from "react";
import PopoverCalendar from "./PopoverCalendar";
export default function PlanInputs() {
    const currDate = new Date();
    const add5Date = new Date();
    add5Date.setDate(currDate.getDate() + 5);

    const [dateRange, setDateRange] = useState({
        from: currDate,
        to: add5Date,
    });

    const [time, setTime] = useState("12:00")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dateRange);
        console.log(time)
        console.log(typeof time)

        // TODO: send planned trail date/time to backend
    }

    return (<>
        <form className="flex" onSubmit={(e) => handleSubmit(e)} >            
            <div className="max-w-md mr-4">
                <PopoverCalendar />
            </div>
            <input className="outline mr-4" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <button className="cursor-pointer outline rounded p-1 font-bold text-[#fff] bg-[#588157]" type="submit">Plan it!</button>
        </form>
    </>
    )
}