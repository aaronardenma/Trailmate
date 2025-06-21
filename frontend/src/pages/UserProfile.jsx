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

export default function UserProfile() {
    const user_id = localStorage.getItem("user_id");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [pastTrips, setPastTrips] = useState([]);
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchPastTrips = async () => {
        try {
            const res = await fetch(`http://localhost:5001/api/trips/getTripsForUser/${user_id}`);
            const data = await res.json();
            const fetchtripsWithTrail = await Promise.all(
                (data || []).map(async (trip) => {
                    try {
                        const trailRes = await fetch(`http://localhost:5001/api/trails/getTrailById/${trip.trailID}`);
                        const trailData = await trailRes.json();
                        return { ...trip, trail: trailData };
                    } catch {
                        return { ...trip, trail: { name: "Unknown Trail", photoUrl: "" } };
                    }
                })
            );
            setPastTrips(fetchtripsWithTrail);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!user_id) {
            setMessage("No user logged in");
            setLoading(false);
            return;
        }
        fetch(`http://localhost:5001/api/users/getUserById/${user_id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch user");
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setLoading(false);
                fetchPastTrips();
            })
            .catch((err) => {
                setMessage(err.message);
                setLoading(false);
            });
    }, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const showMessage = (msg) => {
        setMessage(msg);
    };

    const handleUpdate = async () => {
        if (!user) return;
        setUpdating(true);
        try {
            const res = await fetch(`http://localhost:5001/api/users/updateUser/${user_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!res.ok) throw new Error("Update failed");
            showMessage("Details updated successfully!");
        } catch (err) {
            showMessage("Error updating details: " + err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
        try {
            const res = await fetch(`http://localhost:5001/api/users/deleteUser/${user_id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Delete failed");
            showMessage("Account deleted successfully.");
            localStorage.setItem("user_id", null);
            setUser(null);
        } catch (err) {
            showMessage("Error deleting account: " + err.message);
        }
    };

    const handleLogout = async () => {
        showMessage("Logged out successfully.");
        await sleep(700);
        localStorage.setItem("user_id", null);
        setUser(null);
    };

    if (loading) return <div className="p-4 text-center">Loading user data...</div>;
    if (!user) return <div className="p-4 text-center text-red-600">{message || "User not found"}</div>;

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
                    className="flex-grow bg-[#A3B18A] text-white font-semibold py-3 rounded hover:bg-[#859966] transition"
                >
                    {updating ? "Updating..." : "Update Details"}
                </button>
            </div>

            <h2 className="mt-16 mb-8 text-3xl font-semibold text-gray-800 w-full max-w-4xl text-center">
                Your Past Trips
            </h2>

            <div className="w-full max-w-4xl space-y-6">
                {pastTrips.length === 0 && <p className="text-center text-gray-600">No past trips found.</p>}
                {pastTrips.map((trip) => (
                    <div key={trip._id} className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-300">
                        <div className="w-1/3">
                            <img src={trip.trail.photoUrl || "https://via.placeholder.com/150"} alt={trip.trail.name} className="object-cover w-full h-full" />
                        </div>
                        <div className="w-2/3 p-6 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-gray-800">{trip.trail.name}</h3>
                            <div className="mt-2 flex items-center space-x-3">
                                <span className="font-semibold text-green-700">Rating: {trip.userRating}/5</span>
                            </div>
                            <p className="mt-1 text-gray-600">
                                Date: {trip.dateOfTrip ? new Date(trip.dateOfTrip).toLocaleDateString() : "Unknown"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full mt-10 justify-center">
                <button onClick={handleDelete} className="flex-grow bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition">
                    Delete Account
                </button>
                <button onClick={handleLogout} className="flex-grow bg-gray-600 text-white font-semibold py-3 rounded hover:bg-gray-700 transition">
                    Log Out
                </button>
            </div>
        </div>
    );
}