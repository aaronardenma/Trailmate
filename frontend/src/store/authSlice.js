import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, setUnauthenticated } = auth.actions;
export default auth.reducer;
