import { useState } from "react";
import { useDispatch } from 'react-redux';
import AccountSetup from "./AccountSetup";
import ProfileSetup from "./ProfileSetup";
import { useNavigate } from "react-router-dom";
import { updateUser } from '../store/userSlice';

export default function Register({ handleLogInSuccess }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  const [accountData, setAccountData] = useState({
    nickname: "",
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    visibility: "public",
  });

  const [profileData, setProfileData] = useState({
    experience: "",
    selectedGear: {},
  });

  const [page, setPage] = useState(1);

  const handleAccountChange = (field, value) => {
    setAccountData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGearItem = (category, item) => {
    setProfileData((prev) => {
      const categoryGear = prev.selectedGear[category] || {};
      return {
        ...prev,
        selectedGear: {
          ...prev.selectedGear,
          [category]: {
            ...categoryGear,
            [item]: !categoryGear[item],
          },
        },
      };
    });
  };

  const flattenSelectedGear = (selectedGear) => {
    const gearArray = [];
    Object.entries(selectedGear).forEach(([category, itemsObj]) => {
      Object.entries(itemsObj).forEach(([item, selected]) => {
        if (selected) {
          gearArray.push({ category, item });
        }
      });
    });
    return gearArray;
  };

  const handleSubmit = async () => {
    if (!profileData.experience) {
      alert("Please select your experience level");
      return;
    }

    const combinedData = {
      ...accountData,
      badge: profileData.experience,
      gear: flattenSelectedGear(profileData.selectedGear), 
    };

    try {
      const response = await fetch("http://localhost:5001/api/users/register/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(combinedData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        dispatch(updateUser({
          ...data.user,
          profileCompleted: true
        }));
        
        alert("Registration complete!");
        await handleLogInSuccess();
        nav("/");
      } else {
        alert(data.message || "Failed to complete registration");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-2 mb-6 w-full max-w-none">
        {[1, 2].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`flex-1 py-3 rounded cursor-pointer transition-colors ${
              page === num 
                ? "bg-[#588157] text-white" 
                : "bg-gray-200 hover:bg-gray-400"
            }`}
            style={{ width: '50vw' }}
            aria-current={page === num ? "page" : undefined}
          >
            Step {num}
          </button>
        ))}
      </div>

      {page === 1 && (
        <AccountSetup
          data={accountData}
          onChange={handleAccountChange}
          visibility={accountData.visibility}
          setVisibility={(val) => handleAccountChange("visibility", val)}
        />
      )}
      {page === 2 && (
        <ProfileSetup
          experience={profileData.experience}
          setExperience={(val) => handleProfileChange("experience", val)}
          selectedGear={profileData.selectedGear}
          toggleGearItem={toggleGearItem}
        />
      )}

      <div className={`flex mt-4 max-w-xs mx-auto ${
        page === 1 ? "justify-center" : "justify-between"
      }`}>
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
        )}
        {page < 2 ? (
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 mt-8 bg-[#588157] text-white rounded hover:bg-[#6fa26c]"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
