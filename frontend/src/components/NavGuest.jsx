import { Link } from "react-router-dom"

export default function NavGuest() {
    return (
        <nav className="flex justify-between items-center bg-[#ffff] p-8">
            <Link to="/" className="text-4xl text-[#588157] font-bold p-4" >
            TrailMate
            </Link>
            <ul className="flex items-center">
                <li className="mr-8">
                    <Link className="text-sm border border-gray-300 rounded p-3 shadow-[8px_8px_12px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_12px_rgba(0,0,0,0.5)] transition-shadow bg-white" to={'/auth/login'}>Login</Link>
                </li>
                <li>
                    <Link to="/auth/create">
                        <button className="mr-8 bg-[#588157] text-white px-4 py-2 rounded hover:bg-[#4a6a43] transition">
                            Create account
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}