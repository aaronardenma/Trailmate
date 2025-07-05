import { configureStore } from "@reduxjs/toolkit";
import trailFiltersReducer from "./trailFiltersSlice"
import authReducer from "./authSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        filters: trailFiltersReducer,
        auth:authReducer,
        user: userReducer
    },

})