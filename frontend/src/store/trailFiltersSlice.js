import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getTags = createAsyncThunk(
    'filters/getTags',
    async () => {
        try {
            const res = await fetch('http://localhost:5001/api/tags/', {
            method: "GET",
            credentials: 'include',
            })
            const data = await res.json()
            // console.log(data)
            if (res.ok) {
                return data
            } else {
                throw new Error('could not get tags')
            }
        } catch (err) {
            console.error(err)
        }
    }
)
const initialState = {
    elevation: 1000000,
    distance: 1000000,
    tags: [],
    selectedTags: []
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
            state.selectedTags = action.payload;
        },
        resetTagFilter: (state) => {
            state.selectedTags = [];
        },
    },
extraReducers: (builder) => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  }})
export const { updateElevation, updateDistance, updateTags, resetElevationFilter, resetDistanceFilter, resetTagFilter } = trailFilters.actions;
export default trailFilters.reducer;