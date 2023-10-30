import BG_IMG from "../assets/mast-img.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Masthead = () => {
  return (
    <>
      <div
        id="mastheadSection"
        className={`ml-[75.5px] h-screen w-full md:w-auto bg-slate-500`}
        style={{
          background: `url(${BG_IMG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "33.5%",
        }}
      >
        <div className="md:flex md:flex-col md:items-end md:justify-center md:h-[100vh]">
          <div className="md:bg-[#ffffff9f] md:rounded-tl-md md:rounded-bl-md">
            <div className="p-1 flex items-center justify-center flex-row">
              <h1 className="capitalize text-6xl font-myName text-black p-1 m-1">
                Karan Yadav
              </h1>
            </div>
            <div className="flex items-center justify-center flex-col flex-wrap">
              <h4 className="font-mySubTitle text-black text-xl font-bold md:p-1 md:m-1">
                TALK is cheap, show me the CODE
              </h4>
            </div>
            <div className="p-1 m-1 flex flex-center justify-center flex-wrap">
              <AnchorLink href="#projectSection">
                <button className="p-4 border-[1.789px] border-black border-solid rounded-md bg-transparent text-black">
                  <span className="text-lg font-myBtn">Browse</span>
                </button>
              </AnchorLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Masthead;
