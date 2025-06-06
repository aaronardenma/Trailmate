import { Slider } from "@/components/ui/slider"
import {useState} from 'react'

export default function FilterSlider({min, max, filterName, value, onChange, defaultValue}) {

    const percent = ((value - min) / (max - min)) * 100;
    
    const handleChange = (val) => {
        // console.log(val)
        onChange(val)
    }

    return (
        <div className="flex m-8">
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
                    className = "w-full"
                />
            </div>
            <h2 className="font-bold ml-1">{max}</h2>
        </div>

    )
}