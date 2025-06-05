import FilterSlider from "../components/FilterSlider"

export default function Filters() {
    return (
        <>
        <form action="">
            <FilterSlider min={0} max={100} filterName={"Elevation"} />
            <FilterSlider min={0} max={250} filterName={"Distance"} />
        </form>
        </>
    )

}