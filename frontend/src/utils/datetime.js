import { format, parse } from "date-fns";

export function formatTo12Hour(timeStr) {
  const parsed = parse(timeStr, "HH:mm", new Date());
  return format(parsed, "h:mm a");
}

export function getCombinedDateTime(date, timeStr) {
  if (!date || !timeStr) return null;

  const [hours, minutes] = timeStr.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours);
  combined.setMinutes(minutes);
  combined.setSeconds(0);
  combined.setMilliseconds(0);
  return combined;
}
