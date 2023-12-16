import ProjectCard from "../Components/Projects/ProjectCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";
import Logo from "../assets/myLogo.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

const ShowProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const keyword = window.location.search
          .toString()
          .split("=")[1]
          .toLowerCase();
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/get-project-info/by-keywords?keyword=${keyword}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (res.data.success) {
          setData(res.data.data);
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <section className="w-full h-[100vh] bg-gray-300 overflow-y-auto">
        <div className="border-2 border-solid bg-[#9487eb94] border-[#9487eb94] sm:bg-sky-700 sm:border-sky-700 rounded-tl-md rounded-bl-md fixed top-1/2 sm:top-1 right-0 px-2 py-1 flex flex-col items-center justify-start shadow-md shadow-gray-400 ">
          <img src={Logo} alt="pic" className="rounded-md w-10 md:w-14" />
          <Link to={"/"}>
            <div className="m-1 p-2 text-white ">
              <FontAwesomeIcon icon={faHubspot} />
              <span className="mx-1 font-semibold text-md">Home</span>
            </div>
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : data.length > 0 ? (
          data.map((value, index) => {
            return (
              <ProjectCard
                key={index}
                projectCount={index + 1}
                projectCreatedAt={value.createdAt}
                projectUpdatedAt={value.updatedAt}
                projectName={value.projectName}
                projectDescription={value.projectDescription}
                projectKeyFeatures={value.projectKeyFeatures}
                projectLinks={value.projectLinks}
                projectPreviews={value.projectPreviews}
                projectKeywords={value.projectKeywords}
              />
            );
          })
        ) : (
          <p className="text-center text-3xl font-semibold text-gray-800 mt-8">
            No Projects Found
          </p>
        )}
      </section>
    </>
  );
};

export default ShowProjects;
