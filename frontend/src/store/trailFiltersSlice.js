import { createSlice } from "@reduxjs/toolkit";
import tagData from "../tags.json"

const initialState = {
    elevation: 1000000,
    distance: 1000000,
    tags: []
}

const trailFilters = createSlice({
    name: "trailFilters",
    initialState,
    reducers: {
        updateElevation: (state, action) => {
            state.elevation = action.payload
        },
        updateDistance: (state, action) => {
            state.distance = action.payload
        },
        resetElevationFilter: (state) => {
            state.elevation = 1000000
        },
        resetDistanceFilter: (state) => {
            state.distance = 1000000
        },
        updateTags: (state, action) => {
            state.tags = action.payload;
        },
        resetTagFilter: (state) => {
            state.tags = [];
        },

}})

export const { updateElevation, updateDistance, updateTags, resetElevationFilter, resetDistanceFilter, resetTagFilter } = trailFilters.actions;
export default trailFilters.reducer;
