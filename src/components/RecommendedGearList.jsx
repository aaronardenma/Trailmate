import React from 'react';

export default function RecommendedGearList({ recommendedGear, ownedGear }) {
  return (
    <div>
      <h2>Recommended Gear</h2>
      <ul>
        {recommendedGear.map((item) => {
          const owned = isOwned(item, ownedGear);
          return (
            <li key={item} style={{ color: owned ? 'gray' : 'black' }}>
              <input
                type="checkbox"
                checked={owned}
                readOnly
                title={owned ? 'You own this gear' : 'You need to bring this gear'}
              />{' '}
              {item} {owned && '(Owned)'}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function isOwned(item, ownedGear) {
  for (const categoryItems of Object.values(ownedGear)) {
    if (categoryItems && categoryItems[item]) return true;
  }
  return false;
}
