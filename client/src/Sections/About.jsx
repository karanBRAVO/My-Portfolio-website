import Title from "../Components/Title";
import ABOUT_BANNER from "../assets/about.jpg";
import MY_PHOTO from "../assets/myPhoto.jpg";

const About = () => {
  return (
    <>
      <div
        className={`md:ml-[75.5px] h-screen w-full md:w-auto bg-white`}
        id="aboutSection"
      >
        <Title
          imgSrc={ABOUT_BANNER}
          quote={"You will DIE but the words you speak will LIVE Forever."}
        />
        <div className="flex flex-col items-center justify-center p-1 m-1 md:flex-row md:items-start md:justify-start md:h-full">
          <div className="p-1 m-1 bg-black rounded-md flex items-center justify-center md:w-[30%] md:h-[75vh]">
            <img
              src={MY_PHOTO}
              alt="myPhoto"
              className="w-[150px] h-auto rounded-full md:w-max md:rounded-sm"
            />
          </div>
          <div className="p-1 m-1 md:w-[70%] md:h-[75vh]">
            <h1 className="text-black text-lg font-heading underline p-1 m-1">
              Introduction
            </h1>
            <span className="text-sm font-aboutMeFont text-black p-2 text-left">
              {`Greetings! I am KARAN YADAV, a Software Developer with a passion
              for Machine Learning. With 6 months of experience, I have honed my
              skills in Python. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Sint obcaecati perferendis nesciunt laboriosam
              ea tempora aut eligendi itaque numquam facilis pariatur, veniam
              ullam iure odit quisquam! Ab, reiciendis? Aliquid voluptas aperiam
              velit laborum ab sint quis soluta reprehenderit nesciunt suscipit
              fugit minus unde deserunt hic cumque corrupti quae, doloremque
              totam iusto. Mollitia aliquid placeat dicta quo eos debitis vero
              voluptates aperiam!`.substring(0, 300)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
