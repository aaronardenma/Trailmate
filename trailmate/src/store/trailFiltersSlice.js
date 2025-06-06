import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    elevation: 0,
    distance: 0,
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
            state.elevation = 0
        },
        resetDistanceFilter: (state) => {
            state.distance = 0
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

export const {updateElevation, clearFilter, addUser, removeUser } = trailFilters.actions
export default trailFilters.reducer;
