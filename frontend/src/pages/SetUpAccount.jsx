import { Input } from "../components/ui/input"
import {Button} from "../components/ui/button"
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUpProfile } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam"
];

export default function SetUpAccount() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    console.log(useSelector(state => state.users.users))

    const handleSubmit = (e) => {
        e.preventDefault()
        const nickname = e.target[0].value
        const firstName = e.target[1].value
        const lastName = e.target[2].value
        const gender = e.target[3].value
        const badge = e.target[4].value
        const country = e.target[5].value
        console.log(country)
        dispatch(setUpProfile({nickname, firstName, lastName, gender, badge, country}))
        nav("/")
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Setup your Account</h1>
            <form action="/" className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-2">
                    <div>
                        <h2 className="mr-4">Nickname:</h2>
                        <h2 className="mr-4">First Name:</h2>
                        <h2 className="mr-4">Last Name:</h2>
                        <h2 className="mr-4">Gender:</h2>
                        <h2 className="mr-4">Badge:</h2>
                        <h2 className="mr-4">Country:</h2>
                    </div>
                    <div className="flex flex-col">
                        <input className="outline rounded" type="text" />
                        <input className="outline rounded" type="text" />
                        <input className="outline rounded" type="text" />
                        <select name="gender" defaultValue="select">
                            <option disabled value="select">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select name="badge" defaultValue="select">
                            <option disabled value="select">Select</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <select name="country" defaultValue="select">
                            <option disabled value="select">Select</option>
                            {countries.map((country) => <option value={country}>{country}</option>)} 
                        </select>
                    </div>
                </div>
                <Button type='submit' className="mt-4" >Submit</Button>

            </form>
        </div>
    )
}