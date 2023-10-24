import ProjectCard from "../Components/Projects/ProjectCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHubspot } from "@fortawesome/free-brands-svg-icons";
import Logo from "../assets/myLogo.jpg";

const ShowProjects = ({ datas }) => {
  const data = {
    proejctCount: 1,
    projectName: "Code Editor",
    projectDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellat harum perferendis corporis obcaecati necessitatibus id odio alias. Cumque libero error dicta voluptates exercitationem? Id, sed iusto? Incidunt, repellendus harum consequuntur nobis voluptas officiis obcaecati laudantium, mollitia quaerat modi consectetur.",
    projectKeyFeatures: [
      "You can save the file locally or download it",
      "change the orientation",
      "get real time results",
    ],
    projectLinks: [
      { sourceName: "Github", linkTo: "https://github.com/" },
      { sourceName: "Netlify", linkTo: "https://www.netlify.com/" },
    ],
    projectPreviews: [
      {
        tag: "img",
        src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvZGUlMjBlZGl0b3J8ZW58MHx8MHx8fDA%3D",
      },
      {
        tag: "img",
        src: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZGUlMjBlZGl0b3J8ZW58MHx8MHx8fDA%3D",
      },
      {
        tag: "iframe",
        src: "https://www.youtube.com/embed/PU9I-FAhHvE",
        title:
          "[8K] AC Unity RTX 4090 - RAYTRACING - Extreme Settings - BeyondallLimits - ULTRA GRAPHICS SHOWCASE",
      },
    ],
    projectKeywords: ["HTML", "CSS", "Javascript"],
  };

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

        <ProjectCard
          projectCount={data.proejctCount}
          projectName={data.projectName}
          projectDescription={data.projectDescription}
          projectKeyFeatures={data.projectKeyFeatures}
          projectLinks={data.projectLinks}
          projectPreviews={data.projectPreviews}
          projectKeywords={data.projectKeywords}
        />
      </section>
    </>
  );
};

export default ShowProjects;
