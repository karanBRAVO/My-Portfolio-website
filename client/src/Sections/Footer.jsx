import LOGO from "../assets/myLogo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faLinkedin,
  faTwitter,
  faInstagram,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout, setInfo } from "../store/features/loginSlice.js";
import { toast } from "react-toastify";

const Footer = () => {
  const loginState = useSelector((state) => state.login.credentials);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(loginState.email);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail(loginState.email);
  }, [loginState]);

  const socialMediaLinks = [
    {
      name: faYoutube,
      linkTo: "https://www.youtube.com/channel/UC3c471ecB2uo6pJUfmPt_Ow",
    },
    { name: faLinkedin, linkTo: "https://www.linkedin.com/in/karanyadav98/" },
    { name: faTwitter, linkTo: "" },
    { name: faInstagram, linkTo: "" },
    { name: faFacebook, linkTo: "" },
    { name: faGithub, linkTo: "https://github.com/karanBRAVO" },
    {
      name: faCode,
      linkTo: "https://codeforces.com/profile/karanyadav_bravo98",
    },
  ];

  const handleSubscription = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email) {
      if (email == loginState.email) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/user/subscribe-user`,
            { email },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );

          if (res.data.success) {
            toast.success("Subscribed to Karan Yadav", {
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

            toast(`Cannot Subscribe | Already Subscribed`, {
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
        } catch (error) {
          console.error(error);
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
    }

    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div
        id="footerSection"
        className="p-2 text-white sm:h-screen w-full md:w-auto bg-slate-900 md:ml-[75.5px] flex flex-col items-center justify-center md:flex-row"
      >
        <div className="md:w-1/2 sm:h-[100vh] flex items-center justify-center flex-col mx-1">
          <img src={LOGO} alt="myLogo" className="w-[100px] md:w-[200px]" />
          <div className="m-1 p-1">
            <p className="text-center">
              <span className="text-sm md:text-md text-[skyblue] capitalize">
                &copy; 2023 Karan Yadav.
              </span>
              <span className="mx-1">All Rights Reserved.</span>
            </p>
            <p>
              <span>Powered by</span>
              <span className="text-md text-[skyblue] mx-1">
                <a href="https://react.dev/">React Js</a>
              </span>
              <span className="mx-1">and</span>
              <span className="text-md text-[skyblue]">
                <a href="https://tailwindcss.com/">Tailwind CSS</a>
              </span>
            </p>
          </div>
        </div>
        <div className="md:w-1/2 sm:h-[100vh] flex items-center justify-center flex-col m-2 p-2">
          <div className="flex flex-row items-center justify-center m-2 p-2">
            {socialMediaLinks.map((value, index) => {
              return (
                <div key={index} className="p-1 m-1">
                  <a href={value.linkTo} target="_blank">
                    <FontAwesomeIcon
                      icon={value.name}
                      className="hover:text-blue-400"
                    />
                  </a>
                </div>
              );
            })}
          </div>
          <div className="m-2 p-2">
            <h1 className="font-extrabold font-text">Contact Me</h1>
            <p className="px-1 mx-1 text-[white] font-light">
              Email:
              <span className="text-sm text-[#9696ff] font-bold mx-1">
                xpresskaran98@gmail.com
              </span>
            </p>
            <p className="px-1 mx-1 text-[white] font-light">
              Phone:
              <span className="text-sm text-[#9696ff] font-bold mx-1">
                (+91) 7814677153
              </span>
            </p>
            <p className="px-1 mx-1 text-[white] font-light">
              Address:
              <span className="text-sm text-[#9696ff] font-bold mx-1">
                #190 Ramgarh, Village Daffarpur
              </span>
            </p>
            <h1 className="font-extrabold font-text mt-4">
              Subscribe for Updates
            </h1>
            <form
              onSubmit={handleSubscription}
              className="flex flex-row items-center justify-center"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email *"
                autoComplete="off"
                className="outline-none text-black font-light p-1 rounded-none"
              />
              <button
                disabled={isLoading}
                type="submit"
                className="font-text bg-blue-800 text-white cursor-pointer px-2 py-[4.5px] disabled:bg-blue-300 disabled:cursor-progress"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex flex-row items-center justify-center m-2 p-2">
            <div className="m-1 p-1">
              <Link to={"/my/privacy-policy"}>
                <p className="font-bold text-[#6363d1] cursor-pointer">
                  Privacy Policy
                </p>
              </Link>
            </div>
            <div className="m-1 p-1">
              <Link to={"/my/terms-of-services"}>
                <p className="font-bold text-[#6363d1] cursor-pointer">
                  Terms of Service
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
