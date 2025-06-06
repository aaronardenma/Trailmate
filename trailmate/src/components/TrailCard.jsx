import { Link } from "react-router-dom";

export default function TrailCard({ trail }) {
    return (
        <Link
            to={`/trail/${trail.id}`}
            className="flex flex-col rounded cursor-pointer mb-2 min-w-full max-w-1/3 hover:shadow-lg transition-shadow duration-200"
        >
            <img
                src={trail.photoUrl}
                alt={trail.name}
                className="rounded-2xl p-2 self-center w-full h-48 object-cover"
            />
            <h2 className="text-left pl-4 font-semibold">{trail.name}</h2>
        </Link>
    );
}
