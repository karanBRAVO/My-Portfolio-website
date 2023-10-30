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
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/loginSlice.js";

const Footer = () => {
  const loginState = useSelector((state) => state.login.credentials);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(loginState.email);

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

  const handleSubscription = (e) => {
    e.preventDefault();

    if (email) {
      if (email == loginState.email) {
        axios
          .post(
            "/api/user/subscribe-user",
            { email },
            {
              headers: {
                Authorization: `Bearer: ${loginState.token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else {
        if (loginState.token) {
          dispatch(logout());
        }
        navigate("/sign-up");
      }
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div
        id="footerSection"
        className="p-2 text-white h-screen w-full md:w-auto bg-slate-900 ml-[75.5px] flex flex-col items-center justify-center md:flex-row"
      >
        <div className="md:w-1/2 h-[100vh] flex items-center justify-center flex-col mx-1">
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
              <span className="text-md text-[skyblue] mx-1">React Js</span>
              <span className="mx-1">and</span>
              <span className="text-md text-[skyblue]">Tailwind CSS</span>
            </p>
          </div>
        </div>
        <div className="md:w-1/2 h-[100vh] flex items-center justify-center flex-col m-2 p-2">
          <div className="flex flex-row items-center justify-center m-2 p-2">
            {socialMediaLinks.map((value, index) => {
              return (
                <div key={index} className="p-1 m-1">
                  <a href={value.linkTo} target="_blank">
                    <FontAwesomeIcon icon={value.name} />
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
              <button className="font-text bg-blue-800 text-white cursor-pointer px-2 py-[4.5px]">
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex flex-row items-center justify-center m-2 p-2">
            <div className="m-1 p-1">
              <p className="font-bold text-[#6363d1]">Privacy Policy</p>
            </div>
            <div className="m-1 p-1">
              <p className="font-bold text-[#6363d1]">Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
