import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
      state.credentials.isLoggedIn = action.payload.isLoggedIn;
    },
    updateImage: (state, action) => {
      state.credentials.photoUrl = action.payload.photoUrl;
    },
    logout: (state) => {
      state.credentials.email = "";
      state.credentials.photoUrl = "";
      state.credentials.isLoggedIn = false;
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/profile/logout-user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast(`Logged Out`, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            localStorage.removeItem("token");
          } else {
            if (res.data.jwtError) {
              toast(`Logged Out`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.error(`Cannot Logout`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          }
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
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/profile/delete-user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast(`Account Deleted`, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            localStorage.removeItem("token");
          } else {
            if (res.data.jwtError) {
              toast(`Deleted`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.error(`Cannot Delete`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});

export const { setInfo, updateImage, logout, deleteMe } = loginSlice.actions;

export default loginSlice.reducer;
