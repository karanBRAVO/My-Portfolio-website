import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myLogo from "../../assets/myLogo.jpg";
import { useSelector } from "react-redux";

const Show_Skill = () => {
  const check_admin = useSelector((state) => state.admin);

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getSkill = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/get-skills");
      if (res.data.success) {
        setSkills(res.data.skills);
      }
    } catch (err) {
      console.log(err);
      toast.error(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    getSkill();
  }, []);

  const handleDelete = async (name) => {
    setDeleting(true);

    try {
      const res = await axios.delete(`/api/delete-skills?name=${name}`, {
        headers: {
          Authorization: `Bearer ${check_admin.token}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        getSkill();
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setDeleting(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to={"/admin-dashboard"}>
            <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
          </Link>
          <Link to={"/"}>
            <img src={myLogo} alt="pic" className="w-8 h-8 rounded-full" />
          </Link>
        </div>
      </nav>

      <div className="container mx-auto my-8">
        {loading ? (
          <div className="text-2xl font-bold text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.length > 0 ? (
              skills.map((value, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={value.imageUrl}
                    alt="image"
                    className="w-full h-48 object-cover mb-4 rounded shadow-md"
                  />
                  <div>
                    <h1 className="text-xl font-bold mb-2 text-yellow-400 capitalize">
                      {value.name}
                    </h1>
                    <p className="text-gray-300">{value.public_id}</p>
                  </div>
                  <button
                    type="button"
                    disabled={deleting}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300 capitalize"
                    onClick={() => {
                      handleDelete(value.name);
                    }}
                  >
                    {deleting ? <span>Deleting ...</span> : <span>Delete</span>}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-2xl font-bold text-center animate-bounce">
                Add skills ...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Show_Skill;
