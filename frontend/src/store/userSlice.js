import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loggedIn: false,
}

const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.loggedIn = true;
        },
        logout: (state, _action) => {
            state.user = null
            state.loggedIn = false
        }
    }
})

export const { login, logout } = users.actions
export default users.reducer;
