const API_KEY = "K7KRN7C7XA769MDD2S5C8MMBS";

export async function fetchWeather(lat, lon, dateObj) {
  if (!lat || !lon || !dateObj) return null;

  const date = dateObj.toISOString().split("T")[0];
  const location = `${lat},${lon}`;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?unitGroup=metric&key=${API_KEY}&include=days`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();

    if (!data.days || !data.days[0]) throw new Error("No forecast data found");

    const day = data.days[0];
    return {
      temperatureC: day.temp,
      description: day.conditions,
      raining: day.precip > 0,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}