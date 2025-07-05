import NavGuest from "../components/NavGuest";
import { gearCategories } from "@/utils/gearData";

export default function ProfileSetup({ experience, setExperience, selectedGear, toggleGearItem }) {
  
  // const toggleGearItem = (category, item) => {
  //   setSelectedGear((prev) => {
  //     const categoryGear = prev[category] || {};
  //     return {
  //       ...prev,
  //       [category]: {
  //         ...categoryGear,
  //         [item]: !categoryGear[item],
  //       },
  //     };
  //   });
  // };

  return (
    <div>
      <div className="p-8 max-w-[90rem] mx-auto">
        <h2
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: "#344E41" }}
        >
          Register
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3">Select Your Experience Level</h3>
          <div className="flex flex-col space-y-2 md:flex-row md:gap-x-8">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value={level}
                  checked={experience === level}
                  onChange={() => setExperience(level)}
                  className="cursor-pointer"
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-bold mb-3">What Gear Do You Own?</h3>
        {Object.entries(gearCategories).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h4 className="text-md font-semibold text-[#588157] mb-3">
              {category.replace(/_/g, " ")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!selectedGear[category]?.[item]}
                    onChange={() => toggleGearItem(category, item)}
                    className="cursor-pointer"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
