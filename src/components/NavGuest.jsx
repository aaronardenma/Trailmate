import { Link } from "react-router-dom"

export default function NavGuest() {
    return (
        <nav className="flex justify-between items-center bg-[#DAD7CD]">
            <Link to="/landing" className="text-2xl text-[#588157] font-bold p-4" >
            TrailMate
            </Link>
            <ul className="flex">
                <li className="mr-8">
                    Login
                </li>
                <li className="mr-8">
                    Create account
                </li>
            </ul>
        </nav>

    )
}