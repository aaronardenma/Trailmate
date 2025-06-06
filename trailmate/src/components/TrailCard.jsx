import {Link} from "react-router-dom"
import FilterSlider from "./FilterSlider"

export default function TrailCard(props) {

    return (
        <div className="flex flex-col rounded cursor-pointer mb-2 min-w-full max-w-1/3">
            {/* <Link to={`/`}> */}
            <img src={props.img} alt="" className="rounded-2xl p-2 self-center w-full h-48 object-cover" />
            <h2 className="text-left pl-4">{props.name}</h2>
            {/* </Link> */}
        
        </div>

    )
}