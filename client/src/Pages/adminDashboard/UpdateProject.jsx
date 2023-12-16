import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDebian } from "@fortawesome/free-brands-svg-icons";
import Loading from "../../Components/Loading";
import { useSelector } from "react-redux";

const UpdateProject = () => {
  const check_admin = useSelector((state) => state.admin);
  const [projectData, setProjectData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatingDataStatus, setUpdatingDataStatus] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      const arr = window.location.href.split("/");
      const id = arr[arr.length - 1];
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/get-project-info/by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${check_admin.token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setProjectData(response.data.data);
            setLoading(false);
          }
        });
    } catch (error) {
      console.error(error);
      toast.error("Error while getting project details", {
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
  }, []);

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    setUpdatingDataStatus(true);

    try {
      const arr = window.location.href.split("/");
      const id = arr[arr.length - 1];

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/update-project-info/${id}`,
        projectData,
        { headers: { Authorization: `Bearer ${check_admin.token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        navigate("/my/my-project-show");
      } else {
        toast.error(res.data.message, {
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

      toast.error("Cannot make update request", {
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

    setUpdatingDataStatus(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4 bg-gray-800 text-white">
          <h1 className="text-3xl font-bold mb-6">
            Updating{" "}
            <span className="font-semibold text-2xl text-gray-300">
              {projectData._id}
            </span>
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-400">
                Created At:{" "}
                <span className="font-semibold">{projectData.createdAt}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                Updated At:{" "}
                <span className="font-semibold">{projectData.updatedAt}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateProject}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Name
              </label>
              <input
                type="text"
                placeholder={projectData.projectName}
                autoComplete="off"
                value={projectData.projectName}
                onChange={(e) => {
                  setProjectData({
                    ...projectData,
                    projectName: e.target.value,
                  });
                }}
                className="mt-1 p-2 border rounded w-full bg-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Description
              </label>
              <textarea
                cols="30"
                rows="5"
                placeholder={projectData.projectDescription}
                value={projectData.projectDescription}
                onChange={(e) => {
                  setProjectData({
                    ...projectData,
                    projectDescription: e.target.value,
                  });
                }}
                className="mt-1 p-2 border rounded w-full bg-gray-600 text-white"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Key Features
              </label>
              {projectData.projectKeyFeatures.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-center"
                  >
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder={value}
                      value={value}
                      onChange={(e) => {
                        setProjectData({
                          ...projectData,
                          projectKeyFeatures: [
                            ...projectData.projectKeyFeatures.slice(0, index),
                            e.target.value,
                            ...projectData.projectKeyFeatures.slice(index + 1),
                          ],
                        });
                      }}
                      className="mt-1 p-2 border rounded w-full bg-gray-600 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProjectData((prev) => {
                          return {
                            ...prev,
                            projectKeyFeatures: [
                              ...prev.projectKeyFeatures.slice(0, index),
                              ...prev.projectKeyFeatures.slice(index + 1),
                            ],
                          };
                        });
                      }}
                      className="bg-red-500 text-white py-2 px-3 m-1 rounded-md hover:bg-red-600"
                    >
                      <FontAwesomeIcon icon={faDebian} />
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setProjectData((prev) => {
                    return {
                      ...prev,
                      projectKeyFeatures: [...prev.projectKeyFeatures, ""],
                    };
                  });
                }}
                className="bg-blue-500 text-white p-2 m-1 rounded-md hover:bg-blue-600"
              >
                + Add
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Links
              </label>
              {projectData.projectLinks.map((value, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder={value.sourceName}
                    autoComplete="off"
                    value={value.sourceName}
                    onChange={(e) => {
                      setProjectData((prev) => {
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
                    className="p-2 border rounded w-1/2 m-1 bg-gray-600 text-white"
                  />
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder={value.linkTo}
                    value={value.linkTo}
                    onChange={(e) => {
                      setProjectData((prev) => {
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
                    className="p-2 border rounded w-1/2 m-1 bg-gray-600 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProjectData((prev) => {
                        return {
                          ...prev,
                          projectLinks: [
                            ...prev.projectLinks.slice(0, index),
                            ...prev.projectLinks.slice(index + 1),
                          ],
                        };
                      });
                    }}
                    className="bg-red-500 text-white py-2 px-3 m-1 rounded-md hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faDebian} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setProjectData((prev) => {
                    return {
                      ...prev,
                      projectLinks: [
                        ...prev.projectLinks,
                        { sourceName: "", linkTo: "" },
                      ],
                    };
                  });
                }}
                className="bg-blue-500 text-white p-2 rounded-md m-1 hover:bg-blue-600"
              >
                + Add
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Previews
              </label>
              {projectData.projectPreviews.map((value, index) => (
                <div key={index} className="flex space-x-2">
                  <select
                    value={value.tag}
                    onChange={(e) => {
                      setProjectData((prev) => {
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
                    className="p-2 border rounded w-1/3 m-1 bg-gray-600 text-white"
                  >
                    <option value="img">Image</option>
                    <option value="iframe">Video</option>
                  </select>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder={value.src}
                    value={value.src}
                    onChange={(e) => {
                      setProjectData((prev) => {
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
                    className="p-2 border rounded w-1/3 m-1 bg-gray-600 text-white"
                  />
                  <input
                    type="text"
                    placeholder={value.title}
                    autoComplete="off"
                    value={value.title}
                    onChange={(e) => {
                      setProjectData((prev) => {
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
                    className="p-2 border rounded w-1/3 m-1 bg-gray-600 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProjectData((prev) => {
                        return {
                          ...prev,
                          projectPreviews: [
                            ...prev.projectPreviews.slice(0, index),
                            ...prev.projectPreviews.slice(index + 1),
                          ],
                        };
                      });
                    }}
                    className="bg-red-500 text-white py-2 px-3 m-1 rounded-md hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faDebian} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setProjectData((prev) => {
                    return {
                      ...prev,
                      projectPreviews: [
                        ...prev.projectPreviews,
                        { tag: "", src: "", title: "" },
                      ],
                    };
                  });
                }}
                className="bg-blue-500 text-white p-2 rounded-md m-1 hover:bg-blue-600"
              >
                + Add
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Keywords
              </label>
              {projectData.projectKeywords.map((value, index) => {
                return (
                  <div
                    className="flex flex-row items-center justify-center"
                    key={index}
                  >
                    <input
                      type="text"
                      placeholder={value}
                      autoComplete="off"
                      value={value}
                      onChange={(e) => {
                        setProjectData({
                          ...projectData,
                          projectKeywords: [
                            ...projectData.projectKeywords.slice(0, index),
                            e.target.value,
                            ...projectData.projectKeywords.slice(index + 1),
                          ],
                        });
                      }}
                      className="mt-1 p-2 border rounded w-full bg-gray-600 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProjectData((prev) => {
                          return {
                            ...prev,
                            projectKeywords: [
                              ...prev.projectKeywords.slice(0, index),
                              ...prev.projectKeywords.slice(index + 1),
                            ],
                          };
                        });
                      }}
                      className="bg-red-500 text-white py-2 px-3 m-1 rounded-md hover:bg-red-600"
                    >
                      <FontAwesomeIcon icon={faDebian} />
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setProjectData((prev) => {
                    return {
                      ...prev,
                      projectKeywords: [...prev.projectKeywords, ""],
                    };
                  });
                }}
                className="bg-blue-500 text-white p-2 rounded-md m-1 hover:bg-blue-600"
              >
                + Add
              </button>
            </div>
            <div>
              <button
                type="submit"
                disabled={updatingDataStatus}
                className="bg-blue-500 disabled:bg-blue-300 text-white p-3 rounded-md w-full hover:bg-blue-600"
              >
                {updatingDataStatus ? (
                  <span>Updating ...</span>
                ) : (
                  <span>Update Project</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProject;
