import { Slider } from "@/components/ui/slider"
import {useState} from 'react'

export default function FilterSlider({min, max, filterName}) {
    const [value, setValue] = useState(0);

    const handleChange = (val) => {
        setValue(val)
    }
        const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className="flex sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg m-8">
            <h2 className="font-bold mr-2">{filterName}:</h2>
            <h2 className="font-bold mr-1">{min}</h2>
            <div className="relative flex-1">
                <div
                    className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-sm font-medium transform -translate-x-1/2 transition-all duration-200 ease-out"
                    style={{ left: `${percent}%` }}
                >
                    {value}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
                <Slider
                    value={[value]}
                    min={min}
                    max={max}
                    step={1}
                    onValueChange={(val) => handleChange(val)}
                />
            </div>
            <h2 className="font-bold ml-1">{max}</h2>
        </div>

    )
}
