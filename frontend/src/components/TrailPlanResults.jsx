import React from "react";
import RouteMap from "../components/RouteMap";

export default function TrailPlanResults({
                                           trail,
                                           date,
                                           time,
                                           saveTrip,
                                           startTrip,
                                           weather,
                                           recommendedByCategory,
                                           ownedGear,
                                         }) {
  const start = { lat: 49.261901341297744, lng: -123.2494536190855 };
  const end = { lat: trail.latitude, lng:trail.longitude };
  //
  // const reportHazard = () => {
  //   navigate(`/hazard/${tripId}`);
  // };

  return (
      <div>
        <div className="grid md:grid-cols-2 gap-10 px-6 pb-6">
          <div>
            <div className="flex flex-col">
              <div className="flex flex-col items-start mb-6">
                <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-300 shadow-lg mb-2">
                  <RouteMap from={start} to={end} />
                </div>
                <p className="text-center text-gray-600 w-full">{trail?.location}</p>
              </div>
            </div>

            <div className="flex justify-center mb-4 flex-wrap gap-6">
              <p className="text-lg text-center">
                <span className="font-bold">Difficulty: </span>
                <span className="text-gray-600">{trail?.difficulty}</span>
              </p>
              <p className="text-lg text-center">
                <span className="font-bold">Distance: </span>
                <span className="text-gray-600">{trail?.distanceKm} km</span>
              </p>
              <p className="text-lg text-center">
                <span className="font-bold">Elevation: </span>
                <span className="text-gray-600">{trail?.avgElevationM} m</span>
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p>
                On{" "}
                <span className="font-bold">
                {date.from.toLocaleDateString()}
              </span>{" "}
                around <span className="font-bold">{time}</span>, the conditions
                on <span className="font-bold">{trail?.name}</span> are:
              </p>

              <p>
                <span className="font-bold">Weather: </span>
                {weather ? (
                    <>
                      {weather.description}, {weather.temperatureC}°C,{" "}
                      {weather.raining ? "Rain expected" : "No rain expected"}
                    </>
                ) : (
                    "Loading..."
                )}
              </p>

              {/* <p>
                <span className="font-bold">Trail: </span>
                {trail?.conditions ?? "N/A"}
              </p>

              <p>
                <span className="font-bold">Summit: </span>
                {trail?.summitConditions ?? "N/A"}
              </p> */}

              <p>
                Based on your experience and gear, you{" "}
                <span className="font-bold text-[#588157]">
                {Object.keys(recommendedByCategory).every((cat) =>
                    recommendedByCategory[cat]?.every(
                        (item) => ownedGear?.[cat]?.[item]
                    )
                )
                    ? "can safely"
                    : "may not be fully prepared to"}
              </span>{" "}
                hike {trail?.name}.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-8 space-y-4">
              <h3 className="font-semibold text-lg">Recommended Gear List</h3>
              {Object.keys(recommendedByCategory).length > 0 ? (
                  Object.entries(recommendedByCategory).map(
                      ([category, items]) => (
                          <div key={category}>
                            <h4 className="font-bold text-[#588157] mb-1">
                              {category.replace(/_/g, " and ")}
                            </h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {items.map((item) => (
                                  <li
                                      key={item}
                                      className={`${
                                          ownedGear?.[category]?.[item]
                                              ? "font-semibold text-black"
                                              : "text-gray-600"
                                      }`}
                                  >
                                    {item} {ownedGear?.[category]?.[item] && "✓"}
                                  </li>
                              ))}
                            </ul>
                          </div>
                      )
                  )
              ) : (
                  <p className="text-gray-500">Loading gear recommendations...</p>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">About This Trail</h3>
              <p className="text-gray-700 leading-relaxed">
                {trail?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 pb-6">
          <button
              className="w-fit bg-[#DAD7CD] text-black font-bold py-3 px-6 rounded-md mr-4 hover:bg-[#E5E3DB] transition-colors cursor-pointer disabled:opacity-50"
              onClick={saveTrip}
          >
             SAVE TRIP
          </button>

          {/* <button
              className="w-fit bg-[#588157] text-white font-bold py-3 px-6 rounded-md mr-4 hover:bg-[#4a6e49] transition-colors cursor-pointer disabled:opacity-50"
              onClick={startTrip}
          >
            START A TRIP
          </button> */}
        </div>
      </div>
  );
}
