import TrailCard from "../components/TrailCard"
import {useState} from 'react'
import {Link} from "react-router-dom"
import { BsFilterCircle } from "react-icons/bs";


export default function Home() {
    let [searchKey, setSearchKey] = useState("")


    const handleSearch = (searchString) => {
        setSearchKey(searchString)
    }
    
    // const searchTrails = () => {
    // const products = useSelector((state) => state.products.products)
    // let searchedProducts = []
    //     if (search === "") {
    //     return
    //     }
    //     for (let i = 0; i < products.length; i++) {
    //     if (products[i].title.toLowerCase().includes(search.toLowerCase())) {
    //         searchedProducts.push(products[i])
    //     } else {
    //         continue;
    //     }
    // }
    
    //     return searchedProducts.map((product, i) => (
    //     <Product key={i} data={parseProduct(product)} />
    //     ));
    // }
    
    return (
        <div className="flex flex-col text-center bg-[#A3B18A]">
            {/* <h1 className="text-2xl mb-4">Welcome to Trailmate!</h1> */}
            <div className="flex relative items-center w-full max-w-sm min-w-[200px] self-center my-4">
                <input className="w-full bg-transparent placeholder:text-slate-100 text-slate-700 text-sm border border-slate-100 rounded-md px-3 py-2 pr-10
                transition duration-300 ease focus:outline-none focus:border-slate-700 shadow-sm focus:shadow" placeholder="Search" onChange={handleSearch} />
                <Link to="/filters" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <BsFilterCircle className="text-white text-2xl"></BsFilterCircle>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                <TrailCard img={"testImg.jpg"} name={"Trail Name"} />
                {/* {searchTrails} */}
            </div>
        </div>
    )
}