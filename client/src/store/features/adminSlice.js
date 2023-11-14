import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "Admin",
  initialState: {
    isAdmin: false,
    token: "",
  },
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload.isAdmin;
      state.token = action.payload.token;
    },
    logoutAdmin: (state) => {
      state.isAdmin = false;
      state.token = "";
    },
  },
});

export const { setIsAdmin, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
