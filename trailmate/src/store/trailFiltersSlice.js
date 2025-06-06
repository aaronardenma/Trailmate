import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elevation: 1000000,
    distance: 1000000
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
        }
    }
})

export const {updateElevation, updateDistance, resetElevationFilter, resetDistanceFilter } = trailFilters.actions
export default trailFilters.reducer;