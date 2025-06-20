import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { gearCategories } from "@/utils/gearData";

const PROFILE_STORAGE_KEY = "userProfile";
const GEAR_STORAGE_KEY = "ownedGear";

export default function UserProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    nickname: "",
    gender: "",
    country: "",
    language: "",
    timeZone: "",
  });

  const [ownedGear, setOwnedGear] = useState({});
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
    const savedGear = JSON.parse(localStorage.getItem(GEAR_STORAGE_KEY));

    if (savedProfile) setProfile(savedProfile);
    if (savedGear) setOwnedGear(savedGear);
    else {
      // default owned gear - later load from registration page
      setOwnedGear({
        Clothing: {
          "Moisture-wicking T-shirts (short sleeve)": true,
          "Waterproof breathable rain jacket": true,
        },
        Footwear: {
          "Hiking boots (waterproof)": true,
        },
      });
    }
  }, []);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

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

  const handleSave = () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem(GEAR_STORAGE_KEY, JSON.stringify(ownedGear));
    setIsSaved(true);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-10">
        <div className="p-4 border-2 border-black rounded-2xl mt-4">
          <Avatar className="w-[200px] h-[200px]">
            <AvatarImage src="profileLogo" alt="User Avatar" />
            <AvatarFallback>Picture Here</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-5">
          <Badge variant="secondary" className="text-[#A3B18A] border border-[#A3B18A]">
            Beginner
          </Badge>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6 mb-12">
        <div>
          <div className="mb-4">
            <h1 className="font-semibold mb-1">Full Name</h1>
            <Input
              className="w-[380px]"
              type="text"
              value={profile.fullName}
              onChange={(e) => handleProfileChange("fullName", e.target.value)}
              placeholder="Full Name"
            />
          </div>

          <div className="mb-4">
            <h1 className="font-semibold mb-1">Gender</h1>
            <Input
              className="w-[380px]"
              type="text"
              value={profile.gender}
              onChange={(e) => handleProfileChange("gender", e.target.value)}
              placeholder="Gender"
            />
          </div>

          <div>
            <h1 className="font-semibold mb-1">Language</h1>
            <Select onValueChange={(val) => handleProfileChange("language", val)} value={profile.language}>
              <SelectTrigger className="w-[380px]">
                <SelectValue placeholder="Select a Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="korean">Korean</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h1 className="font-semibold mb-1">Nick Name</h1>
            <Input
              className="w-[380px]"
              type="text"
              value={profile.nickname}
              onChange={(e) => handleProfileChange("nickname", e.target.value)}
              placeholder="Nick Name"
            />
          </div>

          <div className="mb-4">
            <h1 className="font-semibold mb-1">Country</h1>
            <Input
              className="w-[380px]"
              type="text"
              value={profile.country}
              onChange={(e) => handleProfileChange("country", e.target.value)}
              placeholder="Country"
            />
          </div>

          <div className="mb-4">
            <h1 className="font-semibold mb-1">Time Zone</h1>
            <Select onValueChange={(val) => handleProfileChange("timeZone", val)} value={profile.timeZone}>
              <SelectTrigger className="w-[380px]">
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Timezone</SelectLabel>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="mst">Mountain Time</SelectItem>
                  <SelectItem value="cst">Central Time</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">My Gear</h2>
        {Object.entries(gearCategories).map(([category, items]) => (
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
        ))}
      </div>

      <div className="mt-6">
        <button
          className="bg-[#588157] hover:bg-[#476246] text-white font-semibold px-6 py-2 rounded-lg transition"
          onClick={handleSave}
        >
          Save Changes
        </button>
        {!isSaved && <p className="mt-2 text-sm text-gray-500">You have unsaved changes.</p>}
        {isSaved && <p className="mt-2 text-sm text-green-600">Changes saved!</p>}
      </div>
    </div>
  );
}
