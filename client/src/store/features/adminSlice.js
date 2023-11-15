import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      toast.info("Logged in [ADMIN]", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    logoutAdmin: (state) => {
      state.isAdmin = false;
      state.token = "";
      toast.info("Logged out [ADMIN]", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  },
});

export const { setIsAdmin, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
