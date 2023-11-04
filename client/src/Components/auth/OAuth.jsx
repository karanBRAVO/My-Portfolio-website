import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInfo } from "../../store/features/loginSlice.js";
import { toast } from "react-toastify";

const OAuth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const res = await signInWithPopup(auth, provider);
      const data = {
        email: res.user.email,
        emailVerified: true,
        photoUrl: res.user.photoURL,
      };

      const result = await axios.post(
        "/api/auth/authenticate-with-google",
        data
      );

      if (result.data.success) {
        dispatch(
          setInfo({
            email: data.email,
            photoUrl: data.photoUrl,
            isLoggedIn: true,
          })
        );
        navigate("/");

        toast.success(`Logged In`, {
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
        toast.error(`Cannot Login with Google`, {
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
    } catch (err) {
      console.error(err);
      alert("[!] Unable to authenticate your email");
    }

    setLoadingStatus(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loadingStatus}
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:cursor-progress disabled:opacity-10"
      >
        {loadingStatus ? <>Loading ...</> : <>Continue with Google</>}
      </button>
    </>
  );
};

export default OAuth;
