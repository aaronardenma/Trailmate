import { configureStore } from "@reduxjs/toolkit";
import trailFiltersReducer from "./trailFiltersSlice"

export const store = configureStore({
    reducer: {
        filters: trailFiltersReducer,
        
    },

})