import Title from "../Components/Title";
import CONTACT_BANNER from "../assets/contact_me.jpg";
import BG_IMG from "../assets/contactBG.jpg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout, setInfo } from "../store/features/loginSlice.js";
import { toast } from "react-toastify";

const Contact = () => {
  const loginState = useSelector((state) => state.login.credentials);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [senderData, setSenderData] = useState({
    name: "",
    email: loginState.email,
    phone: "",
    msg: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    setSenderData((prev) => {
      return { name: "", email: loginState.email, phone: "", msg: "" };
    });
  }, [loginState]);

  const handleSubmit = async (e) => {
    setErrorInfo(null);
    e.preventDefault();
    setLoading(true);

    if (
      senderData.email &&
      senderData.name &&
      senderData.phone &&
      senderData.msg
    ) {
      if (senderData.email == loginState.email) {
        try {
          const res = await axios.post(
            "/api/user/send-message/to-me",
            senderData
          );

          if (res.data.success) {
            setSenderData((prev) => {
              return { ...prev, msg: "" };
            });

            toast.success(`Message sent`, {
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
            if (res.data.jwtError) {
              dispatch(setInfo({ email: "", photoUrl: "", isLoggedIn: false }));
              navigate("/sign-up");
            }

            toast.error(`Cannot send message`, {
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
        } catch (e) {
          console.error(e);
        }
      } else {
        if (loginState.isLoggedIn) {
          dispatch(logout());
        }
        navigate("/sign-up");

        toast.info(`Sign-up || Sign-in`, {
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
    } else {
      setErrorInfo("* Fields cannot be empty");
    }

    setLoading(false);
  };

  const handleOnchange = (e) => {
    setErrorInfo(null);

    const { name, value } = e.target;
    setSenderData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleInputOnfocus = (e) => {
    setErrorInfo(null);
  };

  return (
    <>
      <div
        id="contactSection"
        className={`md:ml-[75.5px] sm:h-screen w-full md:w-auto bg-white`}
        style={{
          background: `url(${BG_IMG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "90.5%",
        }}
      >
        <Title
          imgSrc={CONTACT_BANNER}
          quote={"Have Questions I have Answers?"}
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center md:items-start m-1 p-1 md:mt-24"
        >
          <div className="md:flex md:flex-col md:items-center md:justify-center">
            <div className="m-1 p-1">
              <input
                type="text"
                name="name"
                className="bg-transparent border-2 border-solid border-[gold] rounded-2xl p-3 m-1 text-white outline-none font-text w-[290px] h-[50px]"
                placeholder="Name *"
                value={senderData.name}
                onChange={handleOnchange}
                onFocus={handleInputOnfocus}
                autoComplete="off"
              />
            </div>
            <div className="m-1 p-1">
              <input
                type="number"
                name="phone"
                className="bg-transparent border-2 border-solid border-[gold] rounded-2xl p-3 m-1 text-white outline-none font-text w-[290px] h-[50px]"
                placeholder="Mobile Number *"
                value={senderData.phone}
                onChange={handleOnchange}
                onFocus={handleInputOnfocus}
                autoComplete="off"
              />
            </div>
            <div className="m-1 p-1">
              <input
                type="email"
                name="email"
                className="bg-transparent border-2 border-solid border-[gold] rounded-2xl p-3 m-1 text-white outline-none font-text w-[290px] h-[50px]"
                placeholder="Email *"
                value={senderData.email}
                onChange={handleOnchange}
                onFocus={handleInputOnfocus}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="md:flex md:items-center md:justify-center md:flex-col">
            <div className="m-1 p-1">
              <textarea
                name="msg"
                placeholder="Message *"
                className="bg-transparent border-2 border-solid border-[gold] rounded-2xl p-3 m-1 text-white outline-none font-text w-[290px] h-[190px] resize-none"
                value={senderData.msg}
                onChange={handleOnchange}
                onFocus={handleInputOnfocus}
              ></textarea>
            </div>
            {errorInfo ? (
              <div className="ml-3 pl-3">
                <p className="text-sm font-text font-black bg-[#0000008b] text-red-700 w-fit px-[4px] rounded-md">
                  {errorInfo}
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="p-1 m-2 ml-4">
              <button
                disabled={loading}
                className="text-black bg-[gold] border-2 border-solid border-[gold] rounded-lg cursor-pointer px-6 py-3 font-semibold font-text disabled:cursor-progress disabled:bg-[#ffd90069]"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
