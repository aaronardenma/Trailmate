import PopoverCalendar from "./PopoverCalendar";

export default function PlanInputs({ dateRange, setDateRange, time, setTime, handleSubmit }) {
    // TODO: send planned trail date/time to backend

  return (
    <>
      <form className="flex" onSubmit={(e) => handleSubmit(e)}>
        <div className="max-w-md mr-4">
          <PopoverCalendar dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        <input
          className="mr-4"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          className="cursor-pointer outline rounded p-1 font-bold bg-[#588157] text-white hover:bg-[#476246] transition"
          type="submit"
        >
          Plan it!
        </button>
      </form>
    </>
  );
}