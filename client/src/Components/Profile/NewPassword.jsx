import Logo from "../../assets/myLogo.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewPassword = ({ email }) => {
  const [errorInfo, setErrorInfo] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setErrorInfo(null);
    setLoadingStatus(false);
    setNewPassword((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);
    setErrorInfo(null);

    if (
      newPassword.password == newPassword.confirmPassword &&
      newPassword.password.length > 0 &&
      newPassword.confirmPassword.length > 0
    ) {
      axios
        .post("/api/profile/forget-password/reset-password", {
          password: newPassword.password,
        })
        .then((res) => {
          if (!res.data.success) {
            setErrorInfo(res.data.message);

            toast.error(`${res.data.message}`, {
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
            toast.success(res.data.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            setLoadingStatus(false);
            navigate("/");
          }
        })
        .catch((error) => {
          setErrorInfo("[-] Error while submitting form");

          toast.error(`Error while submitting data`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else {
      setErrorInfo("* Required fields");

      toast.error(`Required Fields | both should match`, {
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

    setLoadingStatus(false);
  };

  return (
    <>
      <section className="w-full h-[100vh] flex items-center justify-center flex-col bg-slate-950">
        <div className="p-3 border-2 border-solid border-sky-400 rounded-lg shadow-md shadow-sky-400 flex items-center justify-center flex-col">
          <img
            src={Logo}
            alt="photo"
            className="rounded-full w-12 h-12 object-cover border-2 border-solid border-white shadow-md shadow-white my-3"
          />
          <p className="font-text text-xs md:text-sm text-slate-500 font-light">
            {email}
          </p>
          <form
            onSubmit={handleFormSubmit}
            className="gap-3 flex flex-col items-center justify-center p-2"
          >
            <input
              className="px-2 py-1 rounded-md border-[1px] border-solid border-white text-white bg-transparent text-base font-semibold outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Password *"
              autoComplete="off"
              value={newPassword.password}
              onChange={handleInputChange}
            />
            <input
              className="px-2 py-1 rounded-md border-[1px] border-solid border-white text-white bg-transparent text-base font-semibold outline-none"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password *"
              autoComplete="off"
              value={newPassword.confirmPassword}
              onChange={handleInputChange}
            />
            {errorInfo && (
              <p className="text-base font-text font-normal text-red-500">
                {errorInfo}
              </p>
            )}
            <button
              type="submit"
              disabled={loadingStatus}
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full hover:opacity-95 text-white font-myBtn text-base capitalize disabled:bg-blue-500 disabled:cursor-not-allowed"
            >
              {loadingStatus ? <>Processing ...</> : <>Reset Password</>}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewPassword;
