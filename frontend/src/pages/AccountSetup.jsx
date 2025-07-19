import { Checkbox } from "@/components/ui/checkbox"

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

export default function AccountSetup({ data, onChange, visibility, setVisibility }) {
  return (
    <div className="flex flex-col items-center">
      <h1>Setup your Account</h1>
      <form className="flex flex-col items-center">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="mr-4">Nickname:</h2>
            <h2 className="mr-4">First Name:</h2>
            <h2 className="mr-4">Last Name:</h2>
            <h2 className="mr-4">Gender:</h2>
            <h2 className="mr-4">Country:</h2>
          </div>
          <div className="flex flex-col">
            <input
              className="outline rounded"
              name="nickname"
              type="text"
              value={data.nickname}
              onChange={(e) => onChange("nickname", e.target.value)}
            />
            <input
              className="outline rounded"
              name="firstName"
              type="text"
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
            />
            <input
              className="outline rounded"
              name="lastName"
              type="text"
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
            />
            <select
              name="gender"
              value={data.gender || ""}
              onChange={(e) => onChange("gender", e.target.value)}
            >
              <option disabled value="">
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select
              name="country"
              value={data.country || ""}
              onChange={(e) => onChange("country", e.target.value)}
            >
              <option disabled value="">
                Select
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>


          </div>
        </div>
        <div className="flex items-center mt-4">
                <Checkbox
                checked={visibility === "public"}
                onCheckedChange={(checked) => setVisibility(checked ? "public" : "private")} />
                <p className="ml-2">Allow others to see your profile?</p>
            </div>
      </form>
    </div>
  );
}
