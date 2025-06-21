import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elevation: 1000000,
    distance: 1000000,
    users: [],
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
        addUser: (state, action) => {
            const addedUser = state.users.find((singleUser) => singleUser.id === action.payload.id);
            if (addedUser) {
                addedUser.quantity++;
            } else {
                state.users.push({ ...action.payload, quantity: 1 });
            }
        },
        removeUser: (state, action) => {
            const removeUser = state.users.filter((singleUser) => singleUser.id !== action.payload);
            state.users = removeUser;
        },
    }
})

export const {updateElevation, updateDistance, resetElevationFilter, resetDistanceFilter, addUser, removeUser } = trailFilters.actions
export default trailFilters.reducer;
