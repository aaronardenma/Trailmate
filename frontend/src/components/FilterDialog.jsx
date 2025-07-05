import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import FilterSlider from "./FilterSlider";
import FilterTag from "./FilterTag";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../store/trailFiltersSlice";

export default function FilterDialog({
  trigger,
  onFiltersApply,
  onFiltersReset,
  initialElevation = 750,
  initialDistance = 10,
}) {
  const minElevation = 0;
  const minDistance = 0;
  const maxDistance = 20;
  const maxElevation = 1500;

  const [elevation, setElevation] = useState(initialElevation);
  const [distance, setDistance] = useState(initialDistance);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = useSelector((state) => state.filters.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter;

    if (submitter.name === "reset") {
      setElevation(0);
      setDistance(0);
      setSelectedTags([]);
      onFiltersReset();
    } else {
      onFiltersApply({ elevation, distance, tags: selectedTags });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trail Filters:</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form action="/" onSubmit={handleSubmit}>
          <FilterSlider
            min={minElevation}
            max={maxElevation}
            filterName={"Elevation (m)"}
            value={elevation}
            onChange={setElevation}
          />
          <FilterSlider
            min={minDistance}
            max={maxDistance}
            filterName={"Distance (km)"}
            value={distance}
            onChange={setDistance}
          />
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <FilterTag
                key={tag._id}
                tag={tag.name}
                isSelected={selectedTags.includes(tag._id)}
                onToggle={() => handleTagToggle(tag._id)}
              />
            ))}
          </div>

          <DialogFooter className="mt-4" >
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <Button type="submit" className="cursor-pointer outline bg-gray-100 font-bold hover:bg-gray-200" name="reset" variant="secondary">
                  Reset
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" className="cursor-pointer bg-green-600 text-white font-bold hover:bg-green-700" name="apply" variant="secondary">
                  Submit
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
