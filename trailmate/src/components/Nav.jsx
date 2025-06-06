import {Link} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";


export default function Nav() {

  return (
      <nav>
          <ul className="flex">
            <li>
              <Link to="/favourites" className="mr-8 flex items-center" >
                <FaRegStar className="mr-1.5 text-xl" />
                <span className="font-semibold">Favourites</span>
              </Link>
            </li>
            <div>
              <li>
                <Link to="/profile" className="mr-8 flex items-center">
                  <FaRegUserCircle className="mr-1.5 text-xl " />
                  <span className="font-semibold">
                    User
                    </span>
                </Link>
              </li>
            </div>
          </ul>
      </nav>
  )
}