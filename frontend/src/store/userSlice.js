import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  profileCompleted: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.profileCompleted = action.payload.profileCompleted
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.profileCompleted = action.payload.profileCompleted
    },
    clearUser: (state) => {
      state.user = null;
      state.profileCompleted = false;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;