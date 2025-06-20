import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TrailCard({ trail_id }) {
    const [trail, setTrail] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5001/api/trails/getTrailById/${trail_id}`)
            .then(async (res) => {
                console.log("kknvkjv")
                const tr = await res.json();
                setTrail(tr);
            })
            .catch((err) => console.error("Error fetching trail:", err));
    }, [trail_id]);

    if (!trail) return null;
    console.log(trail)

    return (
        <Link
            to={`/trail/${trail._id}`}
            className="flex flex-col rounded cursor-pointer mb-2 min-w-full max-w-1/3 hover:shadow-lg transition-shadow duration-200 bg-white shadow"
        >
            <img
                src={trail.photoUrl}
                alt={trail.name}
                className="rounded-2xl p-2 self-center w-full h-48 object-cover"
            />
            <div className="pl-4 pb-4">
                <h2 className="font-semibold text-lg">{trail.name}</h2>
                <p className="text-sm text-gray-500">{trail.city}</p>
            </div>
        </Link>
    );
}
