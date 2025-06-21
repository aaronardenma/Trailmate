import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function Calendar04() {
  const currDate = new Date();
  const add5Date = new Date();
  add5Date.setDate(currDate.getDate() + 5);

  const [dateRange, setDateRange] = React.useState({
    from: currDate,
    to: add5Date,
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      className="rounded-lg border shadow-sm" />
  );
}
