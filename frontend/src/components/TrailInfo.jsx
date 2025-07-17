import PopoverCalendar from "@/components/PopoverCalendar.jsx";

export default function TrailInfo({
  trail,
  date,
  setDate,
  time,
  setTime,
  setPlanning
}) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10 px-6 pb-6">
        {/* First Column - Trail Info */}
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

          <div className="flex justify-center">
            <div className=" space-y-3">
              <p className="text-lg">
                <span className="font-bold">Difficulty: </span>
                <span className="text-gray-600">{trail?.difficulty}</span>
              </p>
              <p className="text-lg">
                <span className="font-bold">Distance: </span>
                <span className="text-gray-600">{trail?.distanceKm} km</span>
              </p>
              <p className="text-lg">
                <span className="font-bold">Elevation: </span>
                <span className="text-gray-600">{trail?.avgElevationM} m</span>
              </p>
            </div>
          </div>
        </div>

        {/* Second Column - Form and Description */}
        <div className="flex flex-col">
          {/* Form Section */}
          <div className="mb-8 space-y-4">
            <h3 className="font-semibold text-lg">Plan Your Hike</h3>
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

          {/* Description Section */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-3">About This Trail</h3>
            <p className="text-gray-700 leading-relaxed">
              {trail?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="w-fit bg-[#588157] text-white font-bold py-3 px-6 rounded-md mr-4 hover:bg-[#4a6e49] transition-colors cursor-pointer disabled:opacity-50"
          type="submit"
          onClick={() => setPlanning(true)}
        >
          START HIKE
        </button>
      </div>
    </div>
  );
}
