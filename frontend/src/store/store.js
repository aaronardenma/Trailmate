import { configureStore } from "@reduxjs/toolkit";
import trailFiltersReducer from "./trailFiltersSlice"
import userReducer from "./userSlice.js"

export const store = configureStore({
    reducer: {
        filters: trailFiltersReducer,
        users:userReducer
        
    },

})