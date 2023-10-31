import Heading from "./Heading";
import Title from "./Title";

const ProjectCard = ({
  projectCount = 1,
  projectCreatedAt,
  projectUpdatedAt,
  projectName = "project name",
  projectDescription = "this is project description",
  projectKeyFeatures = [],
  projectLinks = [{ sourceName: "", linkTo: "" }],
  projectPreviews = [{ tag: "", src: "", title: "" }],
  projectKeywords = ["keyword1", "keyword2"],
}) => {
  return (
    <>
      <div className="bg-white rounded-3xl mx-auto my-5 w-[95.5%] max-h-fit p-4 shadow-lg shadow-blue-300">
        <Heading count={projectCount} projectName={projectName} />
        <div className="ml-5 m-1 p-2 bg-slate-300 rounded-lg">
          <Title title={"Created At"} />
          <p className="px-1 m-1 font-text text-sm font-semibold">{projectCreatedAt}</p>
        </div>
        <div className="ml-5 m-1 p-2 bg-slate-300 rounded-lg">
          <Title title={"Updated At"} />
          <p className="px-1 m-1 font-text text-sm font-semibold">{projectUpdatedAt}</p>
        </div>
        <div className="ml-5 m-1 p-2 bg-slate-300 rounded-lg">
          <Title title={"Description"} />
          <p className="ml-2 p-1 text-left text-sm font-text font-extralight text-gray-700">
            {projectDescription}
          </p>
        </div>
        <div className="ml-5 m-1 p-2 bg-slate-300 rounded-lg">
          <Title title={"Key Features"} />
          <ul className="p-1 rounded-md font-text m-1 ml-4 list-disc">
            {projectKeyFeatures.map((value, index) => {
              return (
                <li className="text-sm text-sky-600 ml-1" key={index}>
                  {value}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="ml-5 m-1 p-2 bg-slate-300 rounded-lg">
          <Title title={"Links"} />
          <div className="ml-2">
            {projectLinks.map((value, index) => {
              return (
                <p className="text-sm font-medium" key={index}>
                  {value.sourceName} --
                  <a href={value.linkTo} target="_blank">
                    <span className="text-sm text-blue-600">
                      {value.linkTo}
                    </span>
                  </a>
                </p>
              );
            })}
          </div>
        </div>
        <div className="ml-5 m-1 p-2 bg-slate-300 rounded-lg">
          <Title title={"Preview"} />
          <div className="m-1 ml-2 overflow-x-auto flex items-center justify-start flex-row gap-x-2">
            {projectPreviews.map((value, index) => {
              return value.tag == "img" ? (
                <img
                  key={index}
                  src={value.src}
                  alt="photo"
                  title={value.title}
                  className="w-[300px] h-[150px] rounded-sm mx-1"
                />
              ) : (
                <iframe
                  className="rounded-sm mx-1"
                  key={index}
                  src={value.src}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  title={value.title}
                  allowFullScreen
                />
              );
            })}
          </div>
        </div>
        <div className="ml-5 m-1 p-2 bg-slate-300 rounded-lg">
          <Title title={"Keywords"} />
          <div className="m-1 ml-2 flex items-start gap-2 flex-col md:flex-row">
            {projectKeywords.map((value, index) => {
              return (
                <span
                  key={index}
                  className="text-md font-normal font-navlinks text-sky-600 capitalize mx-1 my-[0.9px] hover:underline"
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
