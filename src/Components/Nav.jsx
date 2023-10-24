import Hamburger from "./Hamburger";
import CloseIcon from "./CloseIcon";
import { useState } from "react";
import LOGO from "../assets/myLogo.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Links = [
  { name: "Project", linkto: "#projectSection" },
  { name: "About", linkto: "#aboutSection" },
  { name: "Contact", linkto: "#contactSection" },
];

const Nav = () => {
  const [navLinkVisibility, setNavLinkVisibility] = useState(false);
  const linkWrapper = Links.map((value, index) => {
    return (
      <AnchorLink href={value.linkto} key={index}>
        <li className="cursor-pointer capitalize text-white text-xl p-1 m-1 font-navLinks">
          {value.name}
        </li>
      </AnchorLink>
    );
  });

  const [navwidth, setNavwidth] = useState(75);
  const incNavWidth = () => {
    setNavwidth(navwidth + 100);
    setNavLinkVisibility(!navLinkVisibility);
  };
  const decNavWidth = () => {
    setNavwidth(navwidth - 100);
    setNavLinkVisibility(!navLinkVisibility);
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 h-full bg-[#1b1b1b] transition-all duration-[.5s] ease-linear"
        style={{ width: navwidth }}
      >
        <div className="flex items-center justify-center m-2 p-2">
          {!navLinkVisibility ? (
            <Hamburger clickEvent={incNavWidth} />
          ) : (
            <CloseIcon clickEvent={decNavWidth} />
          )}
        </div>
        {!navLinkVisibility ? (
          <div className="h-full flex items-center justify-center">
            <div className="m-1 p-1 rotate-[-90deg]">
              <span className="p-1 text-white text-4xl tracking-widest">
                www.MyBlog.com
              </span>
            </div>
          </div>
        ) : (
          <div className="p-1 m-1">
            <ul className="p-1 m-1 flex items-center justify-center flex-col">
              {linkWrapper}
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
