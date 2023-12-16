import Card from "../Components/Card";
import Title from "../Components/Title";
import { Link } from "react-router-dom";
import PROJECT_BANNER from "../assets/Projects.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Project = () => {
  const [skills, setSkills] = useState([]);

  const getSkill = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-skills`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setSkills(res.data.skills);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSkill();
  }, []);

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
          {skills.map((value, index) => {
            return (
              <div key={index} className="m-2 p-2">
                <Link to={`/my-project-show/query?value=${value.name}`}>
                  <Card imgSrc={value.imageUrl} text={value.name} />
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
