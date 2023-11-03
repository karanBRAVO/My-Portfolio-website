import Logo from "../../assets/myLogo.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NewPassword from "./NewPassword";

const OtpVerification_forgetPassword = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [errorInfo, setErrorInfo] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOtp(e.target.value);
    setErrorInfo(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);
    setErrorInfo(null);
    setNewPassword(false);

    if (otp.length > 0) {
      axios
        .post("/api/profile/forget-password/verify-otp", { otp })
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

            setNewPassword(true);
          }
        })
        .catch((err) => {
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
      setErrorInfo("* Required field");

      toast.error(`Required Field`, {
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

  const handleResentOtp = () => {
    axios
      .post("/api/profile/forget-password/send-otp", {
        email,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setOtp("");
        } else {
          toast.error(response.data.message, {
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
      })
      .catch((err) => {
        toast.error(`Error while resending otp`, {
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
  };

  return (
    <>
      {newPassword ? (
        <NewPassword email={email} />
      ) : (
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
                type="text"
                name="otp"
                id="otp"
                placeholder="OTP *"
                autoComplete="off"
                value={otp}
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
                {loadingStatus ? <>Processing ...</> : <>Verify</>}
              </button>
            </form>
            <div className="mt-3">
              <p className="text-white text-sm font-text">
                Don{"'"}t have otp ?
                <span
                  onClick={handleResentOtp}
                  className="text-base font-semibold text-blue-700 mx-1 cursor-pointer hover:underline"
                >
                  Resend-OTP
                </span>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OtpVerification_forgetPassword;
