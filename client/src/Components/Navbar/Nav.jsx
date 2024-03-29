import Hamburger from "./Hamburger";
import CloseIcon from "./CloseIcon";
import { useEffect, useRef, useState } from "react";
import LOGO from "../../assets/myLogo.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import Profile from "../../Pages/Profile";
import Skeleton from "./Skeleton";
import { useSelector, useDispatch } from "react-redux";

const Links = [
  { name: "Home", linkto: "#mastheadSection" },
  { name: "Project", linkto: "#projectSection" },
  { name: "About", linkto: "#aboutSection" },
  { name: "Contact", linkto: "#contactSection" },
  { name: "Subscribe", linkto: "#footerSection" },
];

const routes = [
  { name: "Sign up", linkTo: "/sign-up" },
  { name: "Login", linkTo: "/log-in" },
];

const Nav = () => {
  const loginState = useSelector((state) => state.login.credentials);
  const dispatch = useDispatch();

  const [navLinkVisibility, setNavLinkVisibility] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const linkWrapper = Links.map((value, index) => {
    return (
      <AnchorLink href={value.linkto} key={index}>
        <li className="cursor-pointer capitalize text-white text-xl p-1 m-1 font-navLinks">
          {value.name}
        </li>
      </AnchorLink>
    );
  });
  const routesWrapper = routes.map((value, index) => {
    return (
      <Link to={value.linkTo} key={index}>
        <li className="cursor-pointer capitalize text-blue-600 text-xl p-1 m-1 font-navLinks">
          {value.name}
        </li>
      </Link>
    );
  });

  const [navwidth, setNavwidth] = useState(75);
  const incNavWidth = () => {
    setNavwidth(navwidth + 100);
    setNavLinkVisibility(!navLinkVisibility);
    setShowProfile(false);
    setLoading(true);
  };
  const decNavWidth = () => {
    setNavwidth(navwidth - 100);
    setNavLinkVisibility(!navLinkVisibility);
    setShowProfile(false);
  };

  const nav = useRef();
  useEffect(() => {
    const handleResize = () => {
      if (navwidth >= 75 + 100 - 0.05) {
        setLoading(false);
      }
    };
    nav.current.addEventListener("transitionend", handleResize);
  }, [navwidth]);

  const toggleMenu = () => {
    if (!isOpen) {
      nav.current.classList.add("left-0");
      nav.current.classList.remove("left-[-70px]");
      incNavWidth();
    } else {
      nav.current.classList.remove("left-0");
      nav.current.classList.add("left-[-70px]");
      decNavWidth();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="fixed left-[-70px] md:left-0 top-0 md:block h-full bg-[#1b1b1b] transition-all duration-[.5s] ease-linear overflow-x-auto overflow-y-hidden custom-scrollbar"
        style={{ width: navwidth }}
        ref={nav}
      >
        {/* for small screen devices */}
        <div className="fixed left-1 top-0 md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none bg-[#1b1b1b] rounded-sm p-[1px]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* For large screens */}
        <div className="hidden md:flex items-center justify-center m-2 p-2">
          {!navLinkVisibility ? (
            <Hamburger clickEvent={incNavWidth} />
          ) : (
            <CloseIcon clickEvent={decNavWidth} />
          )}
        </div>
        {!navLinkVisibility ? (
          <div className="h-full hidden md:flex items-center justify-center">
            <div className="m-1 p-1 rotate-[-90deg]">
              <span className="p-1 text-white text-4xl tracking-widest">
                www.MyBlog.com<sub className="text-xs">Karan_Yadav</sub>
              </span>
            </div>
          </div>
        ) : loading ? (
          <>
            <Skeleton arr={Links} />
          </>
        ) : (
          <div className="p-1 m-1">
            <ul className="p-1 m-1 flex items-start justify-center flex-col">
              {linkWrapper}
              {!loginState.isLoggedIn ? (
                routesWrapper
              ) : (
                <>
                  {!showProfile ? (
                    <></>
                  ) : (
                    <>
                      {/* Hidden Box */}
                      <div
                        className="fixed z-10 left-0 top-0 h-screen w-screen bg-transparent"
                        onClick={() => {
                          setShowProfile(false);
                        }}
                      ></div>
                      <Profile />
                    </>
                  )}
                  <li
                    onClick={() => {
                      setShowProfile(!showProfile);
                    }}
                    className="cursor-pointer capitalize text-blue-600 text-xl p-1 m-1 font-navLinks"
                  >
                    Profile
                  </li>
                </>
              )}
            </ul>
            <div className="p-1 m-1 flex items-center justify-center">
              <div className="p-1 m-1 flex items-center justify-center flex-col">
                <img src={LOGO} alt="Logo" className="w-1/2 rounded-lg m-1" />
                <span className="text-white text-md p-1 m-1">
                  &copy; Karan Yadav
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
