import {Link} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";

export default function Nav() {

//   const dispatch = useDispatch()
  
//   const handleCatalogFilterReset = () => {
//       useSelector((state) => state.login.stattus)
      
//     }

return (
    <nav>
        <ul className="flex">
          <li className="mr-8"><Link to="/favourites">Favourites</Link></li>
          <div>
            <li>
              <Link to="/profile" className="mr-8 flex items-center">
                <FaRegUserCircle className="mr-1.5 text-xl " />
                User
              </Link>
            </li>
          </div>
        </ul>
    </nav>
)
}