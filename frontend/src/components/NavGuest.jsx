import { Link } from "react-router-dom"

export default function NavGuest() {
    return (
        <nav className="flex justify-between items-center bg-[#DAD7CD]">
            <Link to="/landing" className="text-2xl text-[#588157] font-bold p-4" >
                TrailMate
            </Link>
            <ul className="flex items-center">
                <li className="mr-8">
                    Login
                </li>
                <li>
                    <Link to="/register">
                        <button className="mr-8 bg-[#588157] text-white px-4 py-2 rounded hover:bg-[#4a6a43] transition">
                            Create account
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}