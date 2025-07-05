import { Link } from "react-router-dom";
import hikingImage from '../Images/hiker.png';
import NavGuest from "../components/NavGuest";

export default function Landing() {
  return (
    <>
      <NavGuest />
      <div className="bg-[#A3B18A] flex flex-col items-center min-h-screen px-4 py-8">
        <div className="flex flex-col md:flex-row items-center max-w-7xl w-full">
          <div className="md:w-1/2 p-4 md:p-16 text-center md:text-left">
            <h2 className="mb-6 text-3xl md:text-5xl font-bold leading-tight">
              Welcome to TrailMate, the go-to app for trails around Vancouver
            </h2>
            <p className=" text-lg md:text-xl">
              Log in to get started on your personalized trail experience!
            </p>
          </div>

          <div className="md:w-1/2 p-4 md:p-6 flex justify-center">
            <img
              src={hikingImage}
              alt="Hiker"
              className="w-full max-w-md md:max-w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
