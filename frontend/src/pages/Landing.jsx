import { Link } from "react-router-dom"
import hikingImage from '../Images/hiker.png';
import NavGuest from "../components/NavGuest";

export default function Landing() {
    return (
        <>
        <NavGuest></NavGuest>
        <div className="bg-[#A3B18A] flex flex-col items-center">
            <div className="flex items-center">
                <div className="md:w-1/2 p-16">
                    <h2 className="mb-8 text-5xl font-bold">
                        Welcome to TrailMate, the go-to app for trails around Vancouver
                    </h2>
                    <p>
                        Log in to get started on your personalized trail experience! 
                    </p>
                </div>
                <div className="md:w-1/2 p-6 flex justify-center">
                    <img src={hikingImage} alt="" className="w-200 h-auto rounded-xl object-cover" />
                </div>
            </div>
            {/* <Link className="rounded outline bg-[#DAD7CD] p-2" to={"/login"}>Sign in to get started</Link> */}
        </div>
        </>
    )
}