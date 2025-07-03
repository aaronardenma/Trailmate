import React from "react";

export default function UserGear({ gearData, ownedGear, setOwnedGear, onSave, isSaved, setIsSaved, setMessage }) {
  const toggleGearItem = (category, item) => {
    setOwnedGear((prev) => {
      const updated = {
        ...prev,
        [category]: {
          ...(prev[category] || {}),
          [item]: !prev[category]?.[item],
        },
      };
      setIsSaved(false);
      return updated;
    });
  };

  const handleSaveGear = async () => {
    const gearArray = [];
    for (const [category, items] of Object.entries(ownedGear)) {
      for (const item of Object.keys(items)) {
        if (items[item]) {
          gearArray.push({ category, item });
        }
      }
    }

    try {
      await onSave(gearArray);
      setIsSaved(true);
      setMessage('Gear saved to database!');
    } catch (error) {
      setMessage(`Error saving gear: ${error.message}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mt-12">
      <h2 className="text-xl font-semibold mb-4">My Gear</h2>

      {gearData.length === 0 ? (
        <p>Loading gear categories...</p>
      ) : (
        gearData.map(({ category, items }) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-bold text-[#588157] mb-2">
              {category.replace(/_/g, " ")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {items.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!ownedGear?.[category]?.[item]}
                    onChange={() => toggleGearItem(category, item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))
      )}

      <button
        className="bg-[#588157] hover:bg-[#476246] text-white font-semibold px-6 py-2 rounded-lg transition"
        onClick={handleSaveGear}
        disabled={isSaved}
      >
        Save Gear Changes
      </button>

      {!isSaved && <p className="mt-2 text-sm text-gray-500">You have unsaved changes.</p>}
      {isSaved && <p className="mt-2 text-sm text-green-600">Changes saved!</p>}
    </div>
  );
}
