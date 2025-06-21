import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import FilterSlider from "./FilterSlider";
import FilterTag from "./FilterTag";
import tagData from "../tags.json"

export default function FilterDialog({ 
  trigger,
  onFiltersApply,
  onFiltersReset,
  initialElevation = 750,
  initialDistance = 10
}) {
  const minElevation = 0
  const minDistance = 0
  const maxDistance = 20
  const maxElevation = 1500
  
  const [elevation, setElevation] = useState(initialElevation)
  const [distance, setDistance] = useState(initialDistance)
  const [selectedTags, setSelectedTags] = useState([])

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter
    
    if (submitter.name === 'reset') {
      setElevation(0)
      setDistance(0)
      setSelectedTags([])
      onFiltersReset()
    } else {
      onFiltersApply({ elevation, distance, tags: selectedTags })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            filters for trails
          </DialogDescription>
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
            {tagData.map((tag) => (
              <FilterTag 
                key={tag} 
                tag={tag} 
                isSelected={selectedTags.includes(tag)}
                onToggle={() => handleTagToggle(tag)}
              />
            ))}
          </div>
          
          <DialogFooter className="flex flex-col justify-between">
            <DialogClose asChild>
              <Button type="submit" name="reset" variant="secondary">
                Reset
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" name="apply" variant="secondary">
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}