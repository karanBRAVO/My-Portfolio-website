import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: {
    email: "",
    photoUrl: "",
    token: "",
  },
};

const loginSlice = createSlice({
  name: "Login user",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.credentials.email = action.payload.email;
      state.credentials.photoUrl = action.payload.photoUrl;
    },
    setToken: (state, action) => {
      state.credentials.token = action.payload.token;
    },
    logout: (state) => {
      state.credentials.email = "";
      state.credentials.photoUrl = "";
      state.credentials.token = "";
    },
  },
});

export const { setInfo, setToken, logout } = loginSlice.actions;

export default loginSlice.reducer;
