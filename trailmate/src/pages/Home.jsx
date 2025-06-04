import TrailCard from "../components/TrailCard"

export default function Home() {
    return (
        <div className="flex flex-col  text-center">
            <h1 className="text-2xl mb-4">Welcome to Trailmate!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TrailCard />
                <TrailCard />
                <TrailCard />
                <TrailCard />
                <TrailCard />
                <TrailCard />
            </div>
        </div>
    )
}