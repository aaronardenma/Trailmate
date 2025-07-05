
export default function TrailPlanResults({
  trail,
  date,
  time,
  saveTrip,
  startTrip,
  weather,
  recommendedByCategory,
  ownedGear
}) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10 px-6 pb-6">
        {/* First Column - Trail Info */}
        <div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start mb-6">
              <div className="w-full">
                <img
                  src={trail?.photoUrl}
                  alt={trail?.name}
                  className="w-full rounded-xl shadow-lg object-cover border border-gray-300 mb-2 max-h-80"
                />
                <p className="text-center text-gray-600">{trail?.location}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <p className="text-lg mr-8 text-center">
              <span className="font-bold">Difficulty: </span>
              <span className="text-gray-600">{trail?.difficulty}</span>
            </p>
            <p className="text-lg mr-8 text-center">
              <span className="font-bold">Distance: </span>
              <span className="text-gray-600">{trail?.distanceKm} km</span>
            </p>
            <p className="text-lg mr-8 text-center">
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
                  {weather.description}, {weather.temperatureC}°C, 
                  {weather.raining
                    ? " Rain expected"
                    : " No rain expected"}
                </>
              ) : (
                "Loading..."
              )}
            </p>
            <p>
              <span className="font-bold">Trail: </span>
              {/* TODO: input trail conditions */}
            </p>
            <p>
              <span className="font-bold">Summit: </span>
              {/* TODO: input summit conditions */}
            </p>
            <p>
              Based on your experience and gear, you {/* TODO: input recommendation */} hike {trail?.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-8 space-y-4">
            <h3 className="font-semibold text-lg">Recommended Gear List</h3>
            {Object.keys(recommendedByCategory).length > 0 ? (
              Object.entries(recommendedByCategory).map(([category, items]) => (
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
              ))
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
      
      <div className="flex justify-between">
        <button
          className="w-fit bg-[#DAD7CD] text-black font-bold py-3 px-6 rounded-md mr-4 hover:bg-[#E5E3DB] transition-colors cursor-pointer disabled:opacity-50"
          
          onClick={saveTrip}
        >SAVE
        </button>
        <button
          className="w-fit bg-[#588157] text-white font-bold py-3 px-6 rounded-md mr-4 hover:bg-[#4a6e49] transition-colors cursor-pointer disabled:opacity-50"
          
          onClick={startTrip}
        >FINISH
        </button>
      </div>
    </div>
  );
}