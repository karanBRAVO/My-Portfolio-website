import Card from "../Components/Card";
import Title from "../Components/Title";
import { Link } from "react-router-dom";

import PROJECT_BANNER from "../assets/Projects.jpg";
import React_Logo from "../assets/projects/reactjs.svg";
import Css_Logo from "../assets/projects/css.svg";
import Mongodb_Logo from "../assets/projects/mongodb.svg";
import Python_Logo from "../assets/projects/python.svg";
import Tensorflow_Logo from "../assets/projects/tensorflow.svg";
import Tailwind_Logo from "../assets/projects/tailwind.svg";
import Html_Logo from "../assets/projects/html.svg";
import Nodejs_Logo from "../assets/projects/nodejs.svg";
import Js_Logo from "../assets/projects/js.svg";
import Expressjs_Logo from "../assets/projects/expressjs.svg";
import Pygame_Logo from "../assets/projects/pygame.svg";
import Blender_Logo from "../assets/projects/blender.svg";
import Cpp_Logo from "../assets/projects/cpp.svg";
import Matplotlib_Logo from "../assets/projects/matplotlib.svg";
import Numpy_Logo from "../assets/projects/numpy.svg";
import C_Logo from "../assets/projects/c.svg";
import Java_Logo from "../assets/projects/Java.svg";
import Flask_Logo from "../assets/projects/flask.svg";
import Linux_Logo from "../assets/projects/linux.svg";

const projects = [
  { imgSrc: React_Logo, text: "React Js" },
  { imgSrc: Css_Logo, text: "Css" },
  { imgSrc: Mongodb_Logo, text: "Mongodb" },
  { imgSrc: Python_Logo, text: "Python" },
  { imgSrc: Tensorflow_Logo, text: "Tensorflow" },
  { imgSrc: Html_Logo, text: "HTML" },
  { imgSrc: Tailwind_Logo, text: "Tailwind CSS" },
  { imgSrc: Nodejs_Logo, text: "Node Js" },
  { imgSrc: Js_Logo, text: "Javascript" },
  { imgSrc: Expressjs_Logo, text: "Express Js" },
  { imgSrc: Pygame_Logo, text: "Pygame" },
  { imgSrc: Cpp_Logo, text: "C++" },
  { imgSrc: Blender_Logo, text: "Blender" },
  { imgSrc: Matplotlib_Logo, text: "Matplotlib" },
  { imgSrc: Numpy_Logo, text: "Numpy" },
  { imgSrc: C_Logo, text: "C" },
  { imgSrc: Java_Logo, text: "Java" },
  { imgSrc: Flask_Logo, text: "Flask" },
  { imgSrc: Linux_Logo, text: "Linux" },
];

const Project = () => {
  return (
    <>
      <div
        className={`md:ml-[75.5px] sm:h-screen w-full md:w-auto bg-[#e5e6ea]`}
        id="projectSection"
      >
        <Title
          imgSrc={PROJECT_BANNER}
          quote={"Design is intelligence made visible."}
        />
        <div
          className="m-2 p-2 grid overflow-y-auto overflow-x-hidden h-[520px] md:h-[76vh] custom-scrollbar"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {projects.map((value, index) => {
            return (
              <div key={index} className="m-2 p-2">
                <Link to={`/my-project-show/query?value=${value.text}`}>
                  <Card imgSrc={value.imgSrc} text={value.text} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Project;
