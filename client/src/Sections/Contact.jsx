import Title from "../Components/Title";
import CONTACT_BANNER from "../assets/contact_me.jpg";
import BG_IMG from "../assets/contactBG.jpg";
import { useState } from "react";

const Contact = () => {
  const [senderData, setSenderData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(senderData);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setSenderData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div
        id="contactSection"
        className={`ml-[75.5px] h-screen w-full md:w-auto bg-white`}
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
              ></textarea>
            </div>
            <div className="p-1 m-2">
              <button className="text-black bg-[gold] border-2 border-solid border-[gold] rounded-lg cursor-pointer px-6 py-3 font-semibold font-text">
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
