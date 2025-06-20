import { createSlice } from "@reduxjs/toolkit";
import trailData from "../data.json"
const mockFavourites = trailData.slice(0,5)

const initialState = {
    users: [{email: 'aaronma113@gmail.com', password: 'abc', favourites: mockFavourites}],
    loggedIn: true,
    logInError: false,
    currUser: {email: 'aaronma113@gmail.com', password: 'abc', favourites: mockFavourites}
}

const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            if (action.payload.email.includes("@")) {
                const existingUser = state.users.find(user => user.email === action.payload.email);
                if (!existingUser) {
                    state.users.push({
                        email: action.payload.email, 
                        password: action.payload.password,
                        favourites: []
                    });
                    console.log(state.users)
                    console.log("success!")
                    const user = state.users.find(user => user.email === action.payload.email)
                    state.currUser = user
                }
            }
            
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.email !== action.payload.email);

        },
        setUpProfile: (state, action) => {
            const user = state.currUser
            console.log(user)
            user.nickname = action.payload.nickname
            user.firstName = action.payload.firstName
            user.lastName = action.payload.lastName
            user.badge = action.payload.badge
            user.gender = action.payload.gender
            user.country = action.payload.country
            state.loggedIn = true
            state.currUser = user
        },
        login: (state, action) => {
            const user = state.users.find(user => user.email === action.payload.email);
            if (user && user.password === action.payload.password) {
                state.loggedIn = true;
                state.currUser = user
            } else {
                state.loggedIn = false;
                state.currUser = null
            }

        }
    }
})

export const { addUser, deleteUser, setUpProfile, login } = users.actions
export default users.reducer;
