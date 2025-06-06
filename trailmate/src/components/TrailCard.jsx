import {Link} from "react-router-dom"
import FilterSlider from "./FilterSlider"
// export default function TrailCard(props) {

//     return (
//         <div className="flex flex-col items-center bg-amber-100 outline rounded">
//             <Link to={`/home/${props.name}`}>
//             <h2>{props.name}</h2>
//             <img src={props.img} alt="" />
//             </Link>
//         </div>

//     )
// }

export default function TrailCard(props) {

    return (
        <div className="flex flex-col rounded cursor-pointer mb-2 min-w-full max-w-1/3">
            {/* <Link to={`/`}> */}
                <img src={props.img} alt="" className="rounded-2xl p-2 self-center" />
                <h2 className="text-left pl-4">{props.name}</h2>
            {/* </Link> */}
        
        </div>

    )
}