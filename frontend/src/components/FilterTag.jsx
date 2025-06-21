import { LuTag } from "react-icons/lu";
import { FaTag } from "react-icons/fa6";

export default function FilterTag({ tag, isSelected, onToggle }) {
    const handleClick = () => {
        onToggle();
    };

    return (
        <div 
            className={`flex items-center outline rounded-lg p-2 m-2 min-w-fit max-w-full cursor-pointer ${
                isSelected ? `bg-[#3A5A40] text-white` : `bg-[#DAD7CD] text-[#3A5A40]`
            }`} 
            onClick={handleClick}
        >
            {isSelected ? <FaTag className="mr-1" /> : <LuTag className="text-xl mr-1" />}
            {tag}
        </div>
    )
}