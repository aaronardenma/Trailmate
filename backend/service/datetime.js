function getCombinedDateTime(date, timeStr) {
  if (!date || !timeStr) return null;

  const [hours, minutes] = timeStr.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours);
  combined.setMinutes(minutes);
  combined.setSeconds(0);
  combined.setMilliseconds(0);
  return combined;
}

function validateDate(startDate, timeStr) {
  const combined = getCombinedDateTime(startDate, timeStr);
  if (!combined) return false;

  const now = new Date();
  return combined >= now;
}

module.exports = { getCombinedDateTime, validateDate };