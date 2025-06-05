import TrailCard from "../components/TrailCard"
import {useState} from 'react'


export default function Home() {

    return (
        <div className="flex flex-col text-center bg-[#A3B18A]">
            {/* <h1 className="text-2xl mb-4">Welcome to Trailmate!</h1> */}
            <div class="w-full max-w-sm min-w-[200px] self-center my-4">
                <input class="w-full bg-transparent placeholder:text-slate-100 text-slate-700 text-sm border border-slate-100 rounded-md px-3 py-2 
                transition duration-300 ease focus:outline-none focus:border-slate-700 shadow-sm focus:shadow" placeholder="Search" />
                </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
            </div>
        </div>
    )
}