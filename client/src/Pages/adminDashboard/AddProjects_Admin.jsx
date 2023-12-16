import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../../Components/Projects/ProjectCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Logout_Admin from "./Logout_Admin";

const AddProjects_Admin = () => {
  const check_admin = useSelector((state) => state.admin);

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
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (check_admin.isAdmin) {
      setLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/add-project-info`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${check_admin.token}`,
            },
          }
        );
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(response.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-600">
        <Logout_Admin />
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
        <div className="flex lg:flex-row flex-col">
          <form
            onSubmit={handleFormSubmit}
            className="bg-gray-800 rounded-lg p-4 h-fit lg:flex-1 m-2 mt-2 overflow-y-auto custom-scrollbar"
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
                autoComplete="off"
                className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
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
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
                value={formData.projectDescription}
                className="outline-2 outline-blue-700 px-3 py-4 w-full rounded-lg shadow-lg text-lg text-gray-900 m-2 max-h-52 custom-scrollbar"
              ></textarea>
            </div>
            <div className="border-[1px] border-gray-700 p-3 rounded-md m-1 shadow-md">
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
              <div>
                {formData.projectKeyFeatures.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center border-[1px] border-gray-700 p-3 rounded-md m-1 shadow-md"
                    >
                      <input
                        type="text"
                        className="border p-2 w-full rounded-md shadow-md text-lg text-gray-900 m-2 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectKeyFeatures: [
                                ...prev.projectKeyFeatures.slice(0, index),
                                e.target.value,
                                ...prev.projectKeyFeatures.slice(index + 1),
                              ],
                            };
                          });
                        }}
                        value={value}
                      />
                      <button
                        type="button"
                        className="text-base bg-red-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-red-700"
                        onClick={() => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectKeyFeatures: [
                                ...prev.projectKeyFeatures.slice(0, index),
                                ...prev.projectKeyFeatures.slice(index + 1),
                              ],
                            };
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
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
              <div>
                {formData.projectLinks.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="border-[1px] border-gray-700 p-3 rounded-md m-1 shadow-md"
                    >
                      <input
                        type="text"
                        className="border p-2 w-full rounded-md shadow-md text-lg text-gray-900 m-2 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectLinks: [
                                ...prev.projectLinks.slice(0, index),
                                {
                                  ...prev.projectLinks[index],
                                  sourceName: e.target.value,
                                },
                                ...prev.projectLinks.slice(index + 1),
                              ],
                            };
                          });
                        }}
                        value={value.sourceName}
                      />
                      <input
                        type="text"
                        className="border p-2 w-full rounded-md shadow-md text-lg text-gray-900 m-2 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectLinks: [
                                ...prev.projectLinks.slice(0, index),
                                {
                                  ...prev.projectLinks[index],
                                  linkTo: e.target.value,
                                },
                                ...prev.projectLinks.slice(index + 1),
                              ],
                            };
                          });
                        }}
                        value={value.linkTo}
                      />
                      <button
                        type="button"
                        className="text-base bg-red-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-red-700"
                        onClick={() => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectLinks: [
                                ...prev.projectLinks.slice(0, index),
                                ...prev.projectLinks.slice(index + 1),
                              ],
                            };
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
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
                      projectPreviews: [
                        ...prev.projectPreviews,
                        projectPreview,
                      ],
                    };
                  });
                  setProjectPreview({ src: "", title: "", tag: "img" });
                }}
                className="text-base bg-blue-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-blue-700"
              >
                + Add
              </button>
              <div>
                {formData.projectPreviews.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="border-[1px] border-gray-700 p-3 rounded-md m-1 shadow-md"
                    >
                      <select
                        value={value.tag}
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectPreviews: [
                                ...prev.projectPreviews.slice(0, index),
                                {
                                  ...prev.projectPreviews[index],
                                  tag: e.target.value,
                                },
                                ...prev.projectPreviews.slice(index + 1),
                              ],
                            };
                          });
                        }}
                        className="border p-2 w-full rounded-md shadow-md text-lg text-gray-900 m-2 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <option value="img">Image</option>
                        <option value="iframe">Video</option>
                      </select>
                      <input
                        type="text"
                        className="border p-2 w-full rounded-md shadow-md text-lg text-gray-900 m-2 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectPreviews: [
                                ...prev.projectPreviews.slice(0, index),
                                {
                                  ...prev.projectPreviews[index],
                                  src: e.target.value,
                                },
                                ...prev.projectPreviews.slice(index + 1),
                              ],
                            };
                          });
                        }}
                        value={value.src}
                      />
                      <input
                        type="text"
                        className="border p-2 w-full rounded-md shadow-md text-lg text-gray-900 m-2 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectPreviews: [
                                ...prev.projectPreviews.slice(0, index),
                                {
                                  ...prev.projectPreviews[index],
                                  title: e.target.value,
                                },
                                ...prev.projectPreviews.slice(index + 1),
                              ],
                            };
                          });
                        }}
                        value={value.title}
                      />
                      <button
                        type="button"
                        className="text-base bg-red-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-red-700"
                        onClick={() => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectPreviews: [
                                ...prev.projectPreviews.slice(0, index),
                                ...prev.projectPreviews.slice(index + 1),
                              ],
                            };
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
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
                      projectKeywords: [
                        ...prev.projectKeywords,
                        projectKeyWord,
                      ],
                    };
                  });
                  setProjectKeyWord("");
                }}
                className="text-base bg-blue-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-blue-700"
              >
                + Add
              </button>
              <div>
                {formData.projectKeywords.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center border-[1px] border-gray-700 p-3 rounded-md m-1 shadow-md"
                    >
                      <input
                        type="text"
                        className="border p-2 w-full rounded-md shadow-md text-lg text-gray-900 m-2 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectKeywords: [
                                ...prev.projectKeywords.slice(0, index),
                                e.target.value,
                                ...prev.projectKeywords.slice(index + 1),
                              ],
                            };
                          });
                        }}
                        value={value}
                      />
                      <button
                        type="button"
                        className="text-base bg-red-600 px-3 py-2 rounded-md text-white m-3 capitalize font-semibold hover:bg-red-700"
                        onClick={() => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              projectKeywords: [
                                ...prev.projectKeywords.slice(0, index),
                                ...prev.projectKeywords.slice(index + 1),
                              ],
                            };
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-center">
              <button
                disabled={loading}
                className="bg-green-700 text-white px-3 py-4 rounded-lg shadow-lg m-2 font-bold font-text capitalize hover:bg-green-600 disabled:bg-green-300 disabled:cursor-progress"
              >
                {loading ? (
                  <span>Processing ...</span>
                ) : (
                  <span>Add Project</span>
                )}
              </button>
            </div>
          </form>

          <div className="lg:flex-1 m-1">
            <ProjectCard
              projectCreatedAt={new Date().toLocaleDateString()}
              projectUpdatedAt={new Date().toLocaleDateString()}
              projectName={formData.projectName}
              projectDescription={formData.projectDescription}
              projectKeyFeatures={formData.projectKeyFeatures}
              projectLinks={formData.projectLinks}
              projectPreviews={formData.projectPreviews}
              projectKeywords={formData.projectKeywords}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjects_Admin;
