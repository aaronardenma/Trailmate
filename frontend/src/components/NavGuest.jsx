import { Link } from "react-router-dom"

export default function NavGuest() {
  return (
    <nav className="flex  md:flex-row justify-between items-center bg-white p-6 md:p-8 shadow-md">
      <Link
        to="/"
        className="text-3xl md:text-4xl text-[#588157] font-bold p-4"
      >
        TrailMate
      </Link>
      <ul className="flex flex-col md:flex-row items-end md:space-x-8 w-full md:w-auto mt-4 md:mt-0">
        <li className="w-fit md:w-auto mb-3 md:mb-0">
          <Link
            className="block text-center text-sm border border-gray-300 rounded p-3 shadow-[8px_8px_12px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_12px_rgba(0,0,0,0.5)] transition-shadow bg-white"
            to={"/auth/login"}
          >
            Login
          </Link>
        </li>
        <li className="w-fit md:w-auto">
          <Link to="/auth/create">
            <button className="w-full md:w-auto bg-[#588157] text-white px-4 py-2 rounded shadow-[4px_4px_8px_rgba(0,0,0,0.5)] cursor-pointer transition">
              Create account
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
