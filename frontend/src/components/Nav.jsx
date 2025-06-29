import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { resetDistanceFilter, resetElevationFilter } from "../store/trailFiltersSlice";
import { logout } from "@/store/userSlice";
import { TbLogout } from "react-icons/tb";
import { TbBuildingCommunity } from "react-icons/tb";



export default function Nav({onLogout}) {
  const nav = useNavigate()
  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      nav('/landing');
    }
  };

  return (
      <nav className="flex justify-between items-center bg-[#DAD7CD]">
        <Link to="/" className="text-3xl text-[#588157] font-bold ml-8 p-4">
          TrailMate
        </Link>
          <ul className="flex">
            <li>
              <Link to="/community" className="mr-8 flex items-center" >
                <TbBuildingCommunity className="text-[#588157] mr-1.5 text-xl" />
                <span className="font-semibold">Community</span>
              </Link>
            </li>
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
                <Link to="/" className="mr-8 flex items-center" onClick={handleLogout} >
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