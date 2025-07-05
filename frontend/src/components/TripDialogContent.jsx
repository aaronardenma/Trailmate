import PopoverCalendar from "./PopoverCalendar";
import {formatTo12Hour} from "../utils/datetime"


export default function TripDialogContent({
  trip,
  updating,
  date,
  setDate,
  time,
  setTime,
  userRating,
  setUserRating,
  userComments,
  setUserComments,
  weather,
  recommendedByCategory,
  ownedGear
}) {
  const trail = trip.trailID;

  return updating ? (
    <div className="mb-8 space-y-4">
      {trip.status !== "Completed" && (
        <>
          <h3 className="font-semibold text-lg">Update Your Hike Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select dates:
            </label>
            <PopoverCalendar date={date} setDate={setDate} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting time:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              name="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </>
      )}

      {trip.status === "Completed" && (
        <div>
          <label className="block text-gray-700 font-semibold">
            Your Rating
          </label>
          <select
            value={userRating}
            onChange={(e) => setUserRating(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-green-400"
          >
            <option value={0}>Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 font-semibold">Comments</label>
          <textarea
            value={userComments}
            onChange={(e) => setUserComments(e.target.value)}
            rows={4}
            placeholder="Write your experience..."
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:border-green-400"
          />
        </div>
      )}
    </div>
  ) : (
    <div>
      <div className="grid md:grid-cols-2 gap-10 px-6 pb-6">
        <div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start mb-6">
              <div className="w-full">
                <img
                  src={trail.photoUrl}
                  alt={trail.name}
                  className="w-full rounded-xl shadow-lg object-cover border border-gray-300 mb-2 max-h-80"
                />
                <p className="text-center text-gray-600">{trail.location}</p>
              </div>
            </div>
          </div>
          <div
            className={`flex ${
              trip.status !== "Completed"
                ? "justify-center"
                : "flex-col items-center"
            }  mb-4`}
          >
            <p className="text-lg mr-8 text-left">
              <span className="font-bold">Difficulty: </span>
              <span className="text-gray-600">{trail.difficulty}</span>
            </p>
            <p className="text-lg mr-8 text-left">
              <span className="font-bold">Distance: </span>
              <span className="text-gray-600">{trail.distanceKm} km</span>
            </p>
            <p className="text-lg text-left">
              <span className="font-bold">Elevation: </span>
              <span className="text-gray-600">{trail.avgElevationM} m</span>
            </p>
            {trip.status === "Completed" && (
              <p className="text-lg text-left font-bold text-green-500">
                Rating: <span>{userRating}/5</span>
              </p>
            )}
          </div>

          {trip.status !== "Completed" && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center">
                On{" "}
                <span className="font-bold">
                  {new Date(date.from).toLocaleDateString()}
                </span>{" "}
                around <span className="font-bold">{formatTo12Hour(time)}</span>, the conditions
                on <span className="font-bold">{trail.name}</span> are:
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
              <p className="text-center">
                Based on your experience and gear, you{" "}
                {/* TODO: input recommendation */} hike {trail.name}
              </p>
            </div>
          )}
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

          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-3">About This Trail</h3>
            <p className="text-gray-700 leading-relaxed">{trail.description}</p>
          </div>
          {trip.status === "Completed" && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Comments</h3>
              <p className="text-gray-700">{trip.userComments}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
