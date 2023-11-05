import { useState } from "react";
import { Link } from "react-router-dom";

const AddProjects_Admin = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    projectKeyFeatures: [],
    projectLinks: [],
    projectPreviews: [],
    projectKeywords: [],
  });
  const [projectKeyFeature, setProjectKeyFeature] = useState("");
  const [projectLink, setProjectLink] = useState({
    sourceName: "",
    linkTo: "",
  });
  const [projectPreview, setProjectPreview] = useState({
    tag: "img",
    src: "",
    title: "",
  });
  const [projectKeyWord, setProjectKeyWord] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="bg-gray-600">
        <div className="p-2 bg-slate-700 text-white">
          <h1 className="flex items-center flex-row justify-center">
            <Link to={"/admin-dashboard"}>
              <span className="mx-1 p-1 font-black text-2xl text-blue-400 hover:text-white">
                Admin Dashboard
              </span>
            </Link>
            <span className="mx-1 p-1 text-lg text-blue-300">{">"}</span>
            <span className="mx-1 p-1 text-base text-blue-200 font-text">
              Add projects
            </span>
          </h1>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="bg-gray-800 rounded-lg p-4 flex-1 h-fit mx-3 mt-2"
        >
          <div className="border-[1px]  border-gray-700 p-3 rounded-md m-1 shadow-md">
            <h3 className="font-semibold p-1 m-1 text-lg md:text-xl font-navLinks capitalize text-blue-700">
              Project Name
            </h3>
            <input
              type="text"
              placeholder="Project Name"
              name="projectName"
              required
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
              value={formData.projectName}
            />
          </div>
          <div className="border-[1px]  border-gray-700 p-3 rounded-md m-1 shadow-md">
            <h3 className="font-semibold p-1 m-1 text-lg md:text-xl font-navLinks capitalize text-blue-700">
              Project Description
            </h3>
            <textarea
              placeholder="Project Description"
              name="projectDescription"
              required
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
              value={formData.projectDescription}
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
            ></textarea>
          </div>
          <div className="border-[1px]  border-gray-700 p-3 rounded-md m-1 shadow-md">
            <h3 className="font-semibold p-1 m-1 text-lg md:text-xl font-navLinks capitalize text-blue-700">
              Project Key Feature
            </h3>
            <input
              type="text"
              name="projectKeyFeatures"
              id="keyFeatures"
              placeholder="Project Key Features..."
              onChange={(e) => {
                setProjectKeyFeature(e.target.value);
              }}
              value={projectKeyFeature}
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
            />
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    projectKeyFeatures: [
                      ...prev.projectKeyFeatures,
                      projectKeyFeature,
                    ],
                  };
                });
                setProjectKeyFeature("");
              }}
              className="text-base bg-blue-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-blue-700"
            >
              + Add
            </button>
          </div>
          <div className="border-[1px]  border-gray-700 p-3 rounded-md m-1 shadow-md">
            <h3 className="font-semibold p-1 m-1 text-lg md:text-xl font-navLinks capitalize text-blue-700">
              Project Sources-Links
            </h3>
            <label className="text-sm m-5 font-text font-bold text-gray-400">
              Project Source
            </label>
            <input
              type="text"
              name="projectSources"
              id="sources"
              placeholder="Eg: Github"
              onChange={(e) => {
                setProjectLink((prev) => {
                  return {
                    ...prev,
                    sourceName: e.target.value,
                  };
                });
              }}
              value={projectLink.sourceName}
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
            />
            <label className="text-sm m-5 font-text font-bold text-gray-400">
              Project Link
            </label>
            <input
              type="text"
              name="projectLinks"
              id="linkTo"
              placeholder="Eg: https://github.com/karanBRAVO"
              onChange={(e) => {
                setProjectLink((prev) => {
                  return {
                    ...prev,
                    linkTo: e.target.value,
                  };
                });
              }}
              value={projectLink.linkTo}
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
            />
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    projectLinks: [...prev.projectLinks, projectLink],
                  };
                });
                setProjectLink({ sourceName: "", linkTo: "" });
              }}
              className="text-base bg-blue-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-blue-700"
            >
              + Add
            </button>
          </div>
          <div className="border-[1px]  border-gray-700 p-3 rounded-md m-1 shadow-md">
            <h3 className="font-semibold p-1 m-1 text-lg md:text-xl font-navLinks capitalize text-blue-700">
              Project Preview
            </h3>
            <label className="text-sm m-5 font-text font-bold text-gray-400">
              Tag
            </label>
            <select
              name="projectPreviewTags"
              id="projectPreviewTag"
              onChange={(e) => {
                setProjectPreview((prev) => {
                  return {
                    ...prev,
                    tag: e.target.value,
                  };
                });
              }}
              value={projectPreview.tag}
              className="outline-2 w-full rounded-lg shadow-lg outline-blue-700 px-3 py-4 text-gray-900 text-lg mx-2"
            >
              <option value="img">Image</option>
              <option value="iframe">Video</option>
            </select>
            <label className="text-sm m-5 font-text font-bold text-gray-400">
              Source
            </label>
            <input
              type="text"
              name="projectPreviewSrc"
              id="projectPreviewSrc"
              placeholder="Src"
              onChange={(e) => {
                setProjectPreview((prev) => {
                  return {
                    ...prev,
                    src: e.target.value,
                  };
                });
              }}
              value={projectPreview.src}
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
            />
            <label className="text-sm m-5 font-text font-bold text-gray-400">
              Title
            </label>
            <input
              type="text"
              name="projectPreviewTitle"
              id="projectPreviewTitle"
              placeholder="Title"
              onChange={(e) => {
                setProjectPreview((prev) => {
                  return { ...prev, title: e.target.value };
                });
              }}
              value={projectPreview.title}
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
            />
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    projectPreviews: [...prev.projectPreviews, projectPreview],
                  };
                });
                setProjectPreview({ src: "", title: "", tag: "img" });
              }}
              className="text-base bg-blue-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-blue-700"
            >
              + Add
            </button>
          </div>
          <div className="border-[1px]  border-gray-700 p-3 rounded-md m-1 shadow-md">
            <h3 className="font-semibold p-1 m-1 text-lg md:text-xl font-navLinks capitalize text-blue-700">
              Project Keywords
            </h3>
            <input
              type="text"
              name="projectKeyWords"
              id="keyWords"
              placeholder="Eg: React Js"
              onChange={(e) => {
                setProjectKeyWord(e.target.value);
              }}
              value={projectKeyWord}
              className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
            />
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    projectKeywords: [...prev.projectKeywords, projectKeyWord],
                  };
                });
                setProjectKeyWord("");
              }}
              className="text-base bg-blue-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-blue-700"
            >
              + Add
            </button>
          </div>
          <div className="text-center">
            <button className="bg-green-700 text-white px-3 py-4 rounded-lg shadow-lg m-2 font-bold font-text capitalize hover:bg-green-600">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProjects_Admin;
