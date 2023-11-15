import { useState } from "react";
import { Link } from "react-router-dom";
import myLogo from "../../assets/myLogo.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Add_Skill = () => {
  const check_admin = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    data: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`/api/add-skills`, formData, {
        headers: {
          Authorization: `Bearer ${check_admin.token}`,
          "Content-Type": "multipart/form-data",
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
        setFormData({
          name: "",
          data: null,
        });
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
    } catch (err) {
      console.error(err);
      toast.error(err, {
        position: "bottom-left",
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

  return (
    <>
      <nav className="bg-purple-500 p-4">
        <div className="container mx-auto flex items-center justify-center">
          <Link to={"/admin-dashboard"}>
            <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
          </Link>
          <Link to={"/"}>
            <img src={myLogo} alt="pic" className="w-5 h-5 rounded-full m-1" />
          </Link>
        </div>
      </nav>
      <div className="max-w-md mx-auto mt-8 p-6 bg-purple-100 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-purple-800">
          Add a New Skill
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-purple-600 mb-2"
              htmlFor="name"
            >
              Skill Name:
            </label>
            <input
              className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-purple-500"
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-purple-600 mb-2"
              htmlFor="data"
            >
              Skill Data (Image/File):
            </label>
            <input
              className="w-full py-2 px-3 border rounded focus:outline-none focus:ring focus:border-purple-500"
              id="data"
              type="file"
              accept="image/*"
              name="data"
              multiple={false}
              onChange={handleChange}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-progress disabled:bg-purple-300"
            type="submit"
          >
            {loading ? <span>Adding Skill...</span> : <span>Submit</span>}
          </button>
        </form>
      </div>
    </>
  );
};

export default Add_Skill;
