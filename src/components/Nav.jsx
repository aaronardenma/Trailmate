import {Link} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { resetDistanceFilter, resetElevationFilter } from "../store/trailFiltersSlice";
import { logout } from "@/store/userSlice";
import { TbLogout } from "react-icons/tb";

export default function Nav() {
  const dispatch = useDispatch()

  const resetFilters = () => {
    dispatch(resetDistanceFilter())
    dispatch(resetElevationFilter())
  }

  return (
      <nav className="flex justify-between items-center bg-[#DAD7CD]">
        <Link to="/" className="text-3xl text-[#588157] font-bold ml-8 p-4" onClick={resetFilters}>
          TrailMate
        </Link>
          <ul className="flex">
            <li>
              <Link to="/favourites" className="mr-8 flex items-center" >
                <FaRegStar className="text-[#588157] mr-1.5 text-xl" />
                <span className="font-semibold">Favourites</span>
              </Link>
            </li>
              <li>
                <Link to="/profile" className="mr-8 flex items-center">
                  <FaRegUserCircle className="text-[#588157] mr-1.5 text-xl " />
                  <span className="font-semibold">
                    User
                    </span>
                </Link>
              </li>
            
            <li>
                <Link to="/" className="mr-8 flex items-center" onClick={() => dispatch(logout())} >
                  <TbLogout className="text-[#588157] mr-1.5 text-xl " />
                  <span className="font-semibold">
                    Log Out
                    </span>
                </Link>
              </li>
          </ul>
      </nav>
  )
}
