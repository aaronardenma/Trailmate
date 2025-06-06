import {Link} from "react-router-dom"
import { IoFilterCircleOutline } from "react-icons/io5";
import { IoFilterCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Search(props) {
    const elevation = useSelector(state => state.filters.elevation)
    const distance = useSelector(state => state.filters.distance)

    const filtersApplied = () => {
        if (elevation !== 1000000 &&
            distance !== 1000000) {
                return true
        } else {
            return false
        }
    }

    return (
        <div className="flex relative items-center w-full max-w-sm min-w-[200px] self-center my-4">
            <input className="w-full bg-transparent placeholder:text-slate-100 text-slate-700 text-sm border border-slate-100 rounded-md px-3 py-2 pr-10
            transition duration-300 ease focus:outline-none focus:border-slate-700 shadow-sm focus:shadow" placeholder="Search" onChange={props.handleSearch} />
            <Link to="/filters" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                {filtersApplied() ? <IoFilterCircle className="text-white text-2xl" /> : <IoFilterCircleOutline className="text-white text-2xl" />}
            </Link>
        </div>
    )
}

