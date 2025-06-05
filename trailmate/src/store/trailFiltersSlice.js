import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elevation: 0,
    distance: 0
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
            state.elevation = 0
        },
        resetDistanceFilter: (state) => {
            state.distance = 0
        }
    }
})

export const {updateElevation, clearFilter } = trailFilters.actions
export default trailFilters.reducer;