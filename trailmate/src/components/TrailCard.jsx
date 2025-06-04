import {Link} from "react-router-dom"

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

export default function TrailCard() {

    return (
        <div className="flex flex-col items-center bg-amber-100 outline rounded cursor-pointer mb-2 min-w-full max-w-1/3">
            <Link to={`/`}>
            <h2>trail name</h2>
            {/* <img src={props.img} alt="" /> */}
            </Link>
        </div>

    )
}