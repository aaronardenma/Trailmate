import {Link} from "react-router-dom"
import { BsFilterCircle } from "react-icons/bs";


export default function Search(props) {
    return (
        <div className="flex relative items-center w-full max-w-sm min-w-[200px] self-center my-4">
            <input className="w-full bg-transparent placeholder:text-slate-100 text-slate-700 text-sm border border-slate-100 rounded-md px-3 py-2 pr-10
            transition duration-300 ease focus:outline-none focus:border-slate-700 shadow-sm focus:shadow" placeholder="Search" onChange={props.handleSearch} />
            <Link to="/filters" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <BsFilterCircle className="text-white text-2xl"></BsFilterCircle>
            </Link>
        </div>
    )
}

