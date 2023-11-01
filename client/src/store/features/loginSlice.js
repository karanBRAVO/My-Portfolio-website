import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  credentials: {
    email: "",
    photoUrl: "",
    isLoggedIn: false,
  },
};

const loginSlice = createSlice({
  name: "Login user",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.credentials.email = action.payload.email;
      state.credentials.photoUrl = action.payload.photoUrl;
      state.credentials.isLoggedIn = true;
    },
    logout: (state) => {
      state.credentials.email = "";
      state.credentials.photoUrl = "";
      state.credentials.isLoggedIn = false;
      axios
        .get("/api/profile/logout-user")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteMe: (state) => {
      state.credentials.email = "";
      state.credentials.photoUrl = "";
      state.credentials.isLoggedIn = false;
      axios
        .get("/api/profile/delete-user")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});

export const { setInfo, logout, deleteMe } = loginSlice.actions;

export default loginSlice.reducer;
