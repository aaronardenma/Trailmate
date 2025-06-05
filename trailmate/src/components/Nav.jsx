import {Link} from "react-router"
import {useDispatch, useSelector} from "react-redux"
import userLogo from "../Images/user-solid (1).svg"


export default function Nav() {

//   const dispatch = useDispatch()

//   const handleCatalogFilterReset = () => {
//       useSelector((state) => state.login.stattus)

//     }

    return (
        <nav>
            <ul className="flex">
                <li className="mr-2 font-semibold"><Link to="/trails">Trails</Link></li>
                <li className="mr-2 font-semibold"><Link to="/browse">Browse</Link></li>
                <li className="mr-2 font-semibold"><Link to="/routes">Routes</Link></li>
                <li className="mr-2 font-semibold"><Link to="/events">Events</Link></li>
                <li className="mr-2 font-semibold"><Link to="/map">Map</Link></li>
                <li className="mr-2 font-semibold"><Link to="/user">
                    <img src={userLogo} alt="" width="20px" height="20px"/>
                </Link></li>
            </ul>
        </nav>
    )
}
