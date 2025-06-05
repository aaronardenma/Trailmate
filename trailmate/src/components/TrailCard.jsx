import {Link} from "react-router-dom"
import imageIcon from "../Images/placeholderImage.jpg"

export default function TrailCard(props) {

    return (
        <div className="flex flex-col rounded cursor-pointer mb-2 min-w-full max-w-1/3">
            {/* <Link to={`/`}> */}
                <img src={`public/${props.img}`} alt="" className="rounded p-2 self-center" />
                <h2 className="text-left font-bold px-2">{props.name}</h2>
            {/* </Link> */}
        </div>
    )
};
