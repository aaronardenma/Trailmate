import TrailCard from "../components/TrailCard"

export default function Favourites() {
    return (
        <>
            <div className="flex flex-col bg-[#A3B18A]">
                <h1 className="font-bold text-4xl pl-6 pt-8 pb-4 text-left">FAVOURITES</h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
                    <TrailCard img={"https://explore-mag.com/wp-content/uploads/2024/03/Grouse-Grind_327942_max.png"} name={"Grouse Grind"} />
                    <TrailCard img={"https://rockwoodadventures.com/wp-content/uploads/2021/04/1.-Lead-Pic-St-Marks-Summit-Old-Bags-New-Tricks.jpg"} name={"St Marks Summit"} />
                    <TrailCard img={"https://i0.wp.com/besthikesbc.ca/wp-content/uploads/2021/03/DSC02029-Pano.jpg?fit=2048%2C1032&ssl=1"} name={"Dog Mountain"} />
                </div>
            </div>
        </>
    )
}