import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProjectCard = ({ id, createdAt, updatedAt, name }) => {
  const check_admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const moveto_updateProject = (id) => {
    navigate(`/admin-dashboard/update-project/${id}`);
  };

  const deleteProject = async (id) => {
    if (confirm("Are you sure you want to delete this project")) {
      setLoading(true);

      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/delete-project-info/${id}`,
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
          navigate("/admin-dashboard");
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
        toast.error("Cannot make delete request", {
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

      setLoading(false);
    }
  };

  return (
    <div className="bg-teal-900 p-3 rounded-lg flex flex-col w-fit max-w-xl items-start">
      <h1 className="text-white text-3xl font-black p-1 m-1">{name}</h1>
      <div className="text-white text-sm flex items-start flex-col mt-4 mx-5 font-mySubTitle">
        <p className="mt-1">
          <span className="font-black">ID :</span> {id}
        </p>
        <p className="mt-1">
          <span className="font-black">Created At :</span> {createdAt}
        </p>
        <p className="mt-1">
          <span className="font-black">Updated At :</span> {updatedAt}
        </p>
      </div>
      <div className="m-1 mt-3">
        <button
          type="button"
          className="px-3 py-2 rounded-md text-white bg-teal-400 m-1 hover:bg-teal-700 font-text"
          onClick={() => {
            moveto_updateProject(id);
          }}
        >
          Update
        </button>
        <button
          type="button"
          disabled={loading}
          className="px-3 py-2 rounded-md text-white bg-red-400 disabled:bg-red-300 disabled:cursor-progress m-1 hover:bg-red-700 font-text"
          onClick={() => {
            deleteProject(id);
          }}
        >
          {loading ? <span>Deleting...</span> : <span>Delete</span>}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
