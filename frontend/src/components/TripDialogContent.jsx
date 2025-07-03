export default function TripDialogContent({ trip, updating, date, setDate, time, setTime}) {
  const trail = trip.trailID;
  return updating ? (
    <div className="mb-8 space-y-4">
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
    </div>
  ) : (
    <div>
      <div className="grid md:grid-cols-2 gap-10 px-6 pb-6">
        {/* First Column - Trail Info */}
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
                Rating: <span>{trip.userRating}/5</span>
              </p>
            )}
          </div>

          {trip.status !== "Completed" && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center">
                On{" "}
                <span className="font-bold">
                  {new Date(trip.startDate).toLocaleDateString()} -{" "}
                  {new Date(trip.endDate).toLocaleDateString()}
                </span>{" "}
                around <span className="font-bold">{trip.time}</span>, the
                conditions on <span className="font-bold">{trail.name}</span>{" "}
                are:
              </p>

              <p>
                <span className="font-bold">Weather: </span>
                {/* TODO: connect weather api data */}
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
            {/* TODO: Input Gear List */}
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
