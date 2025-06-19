import React, { useState, useEffect } from 'react';
import { gearCategories } from '../utils/gearData';

const STORAGE_KEY = 'ownedGear';

export default function GearOwnershipChecklist() {
  const [ownedGear, setOwnedGear] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setOwnedGear(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedGear));
  }, [ownedGear]);

  function toggleGear(category, item) {
    setOwnedGear((prev) => {
      const categoryItems = prev[category] || {};
      const updatedCategoryItems = {
        ...categoryItems,
        [item]: !categoryItems[item],
      };
      return { ...prev, [category]: updatedCategoryItems };
    });
  }

  return (
    <div>
      <h2>Select Gear You Own</h2>
      {Object.entries(gearCategories).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '1.5rem' }}>
          <h3>{category.replace(/_/g, ' ')}</h3>
          {items.map((item) => {
            const checked = ownedGear[category]?.[item] || false;
            return (
              <label key={item} style={{ display: 'block', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleGear(category, item)}
                />{' '}
                {item}
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}
