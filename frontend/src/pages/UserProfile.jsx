import React, { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
import UserGear from "../components/UserGear";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), 500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded shadow-lg animate-fadeInOut z-50">
      {message}
    </div>
  );
}

function gearArrayToNestedObject(gearArray) {
  const nested = {};
  gearArray.forEach(({ category, item }) => {
    if (!nested[category]) nested[category] = {};
    nested[category][item] = true;
  });
  return nested;
}

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const [gearData, setGearData] = useState([]);
  const [ownedGear, setOwnedGear] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/me', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  useEffect(() => {
    async function fetchGear() {
      try {
        const res = await fetch("http://localhost:5001/api/gear");
        if (!res.ok) throw new Error("Failed to fetch gear data");
        const data = await res.json();
        setGearData(data);
      } catch (err) {
        console.error(err);
        setMessage("Error loading gear categories");
      }
    }
    fetchGear();
  }, []);

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        setUserId(userData._id);
        setUser(userData);
        setLoading(false);

        if (userData.gear && userData.gear.length > 0) {
          setOwnedGear(gearArrayToNestedObject(userData.gear));
        } else {
          setOwnedGear({});
        }

        fetchPastTrips();
      })
      .catch(() => {
        setMessage("Please log in to view your profile");
        setLoading(false);
      });
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveGear = async (gearArray) => {
    const res = await fetch('http://localhost:5001/api/users/update/gear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ gear: gearArray }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to update gear');
  };

  const handleUpdate = async () => {
    if (!user) {
      console.log(user)
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5001/api/users/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Update failed");
      setMessage("Details updated successfully!");
    } catch (err) {
      setMessage("Error updating details: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/users/deleteUser/${userId}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Delete failed");
      setMessage("Account deleted successfully.");
      setUser(null);
      setUserId(null);
    } catch (err) {
      setMessage("Error deleting account: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/api/users/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setMessage("Logged out successfully.");
      await new Promise((resolve) => setTimeout(resolve, 700));
      setUser(null);
      setUserId(null);
    } catch (err) {
      setMessage("Logout failed, but clearing local session");
      setUser(null);
      setUserId(null);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading user data...</div>;
  if (!user) return <div className="p-4 text-center text-red-600">{message || "Please log in to view your profile"}</div>;

  return (
    <div className="flex flex-col items-center bg-[#DAD7CD] min-h-screen py-10 px-4">
      <Toast message={message} onClose={() => setMessage("")} />

      <div className="flex flex-col items-center">
        <div className="p-4 outline-2 outline-black rounded-4xl mt-4">
          <Avatar className="w-[200px] h-[200px]">
            {user.photoUrl ? (
              <AvatarImage src={user.photoUrl} alt={`${user.firstName} ${user.lastName}`} />
            ) : (
              <AvatarFallback>Picture Here</AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="flex flex-col items-center gap-5 mt-4">
          <Badge variant="secondary" className="bg-gray-300 text-[#A3B18A] border-3 border-[#A3B18A]">
            {user.badge || "Beginner"}
          </Badge>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6 mt-8 w-full max-w-4xl">
        <div>
          <h1 className="mb-1 font-semibold text-gray-700">First Name</h1>
          <Input name="firstName" value={user.firstName || ""} onChange={handleChange} placeholder="First Name" className="w-full" />
          <h1 className="mb-1 mt-6 font-semibold text-gray-700">Last Name</h1>
          <Input name="lastName" value={user.lastName || ""} onChange={handleChange} placeholder="Last Name" className="w-full" />
          <h1 className="mb-1 mt-6 font-semibold text-gray-700">Gender</h1>
          <Input name="gender" value={user.gender || ""} onChange={handleChange} placeholder="Gender" className="w-full" />
          <h1 className="mb-1 mt-6 font-semibold text-gray-700">Language</h1>
          <Select onValueChange={(val) => setUser((prev) => ({ ...prev, language: val }))} value={user.language || ""}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {["english", "french", "chinese", "spanish", "korean"].map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h1 className="mb-1 font-semibold text-gray-700">Nickname</h1>
          <Input name="nickname" value={user.nickname || ""} onChange={handleChange} placeholder="Nickname" className="w-full" />
          <h1 className="mb-1 mt-6 font-semibold text-gray-700">Country</h1>
          <Input name="country" value={user.country || ""} onChange={handleChange} placeholder="Country" className="w-full" />
          <h1 className="mb-1 mt-6 font-semibold text-gray-700">Email</h1>
          <Input name="email" value={user.email || ""} onChange={handleChange} placeholder="Email" type="email" className="w-full" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full mt-10 justify-center">
        <button
            onClick={handleUpdate}
            disabled={updating}
            className="bg-[#588157] hover:bg-[#476246] text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          {updating ? "Updating..." : "Update Details"}
        </button>
      </div>


      <UserGear
        gearData={gearData}
        ownedGear={ownedGear}
        setOwnedGear={setOwnedGear}
        onSave={handleSaveGear}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        setMessage={setMessage}
      />



      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full mt-10 justify-center">
        {/*<button*/}
        {/*  onClick={handleUpdate}*/}
        {/*  disabled={updating}*/}
        {/*  className="flex-grow bg-[#A3B18A] text-white font-semibold py-3 rounded hover:bg-[#859966] transition"*/}
        {/*>*/}
        {/*  {updating ? "Updating..." : "Update Details"}*/}
        {/*</button>*/}
        <button
          onClick={handleDelete}
          className="flex-grow bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition"
        >
          Delete Account
        </button>
        <button
          onClick={handleLogout}
          className="flex-grow bg-gray-600 text-white font-semibold py-3 rounded hover:bg-gray-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
