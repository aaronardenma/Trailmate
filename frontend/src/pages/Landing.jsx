import NavGuest from "../components/NavGuest"

export default function Landing() {
    return (
        <div>
            <NavGuest />
            <div className="bg-[#A3B18A] flex items-center">
                <div className="md:w-1/2 p-16">
                    <h2 className="mb-8 text-4xl font-bold">
                        Welcome to TrailMate, the go-to app for trails around Vancouver
                    </h2>
                    <p>
                        Trailmate description 
                    </p>
                </div>
                <div className="md:w-1/2 p-6 flex justify-center">
                    <img src="https://explore-mag.com/wp-content/uploads/2024/03/Grouse-Grind_327942_max.png" alt="" className="w-200 h-auto rounded-xl shadow-md object-cover" />
                </div>
            </div>
        </div>

    )
}