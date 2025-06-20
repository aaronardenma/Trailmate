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
        <form className="flex items-center" onSubmit={(e) => handleSubmit(e)} >            
            <div className="flex flex-col text-right items-end max-w-md mr-4">
                <p className="mr-4 mb-4 whitespace-nowrap">I want to hike this trail on</p>
                <p className="mr-4 whitespace-nowrap">starting around</p>
            </div>
            <div className="flex flex-col items-left">
                
                <PopoverCalendar />
                <input className="outline mr-4" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div>
                <button className="ml-8 cursor-pointer outline rounded p-3 font-bold text-[#fff] bg-[#588157]" type="submit">GO</button>
            </div>
        </form>
    </>
    )
}