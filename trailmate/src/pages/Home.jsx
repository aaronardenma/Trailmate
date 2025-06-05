import TrailCard from "../components/TrailCard"

export default function Home() {
    return (
        <div className="flex flex-col text-center bg-[#A3B18A]">
            {/* <h1 className="text-2xl mb-4">Welcome to Trailmate!</h1> */}
            <input type="text" placeholder="Search trails" className="outline rounded outline-white w-xl self-center"/>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
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