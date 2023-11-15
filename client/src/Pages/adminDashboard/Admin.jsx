import { useNavigate } from "react-router-dom";
import myLogo from "../../assets/myLogo.jpg";
import Logout_Admin from "./Logout_Admin";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen flex flex-col md:flex-row bg-gray-800 mt-5">
        <Logout_Admin />
        <div className="fixed top-0 flex items-center justify-center w-full bg-gray-900 p-4 text-white text-center">
          <h1 className="text-2xl font-bold font-heading capitalize">
            Admin Dashboard
          </h1>
          <img
            src={myLogo}
            alt="Logo"
            onClick={() => {
              navigate("/");
            }}
            className="rounded-full m-1 w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="p-6 m-4 shadow-lg flex flex-col items-center justify-evenly cursor-pointer w-48 md:w-72 lg:w-1/2 lg:h-1/2 h-48 md:h-72 rounded-md bg-gray-900 hover:bg-blue-700 transition duration-300"
            onClick={() => {
              navigate("/my/add-project-new");
            }}
          >
            <span className="text-blue-400 text-8xl md:text-9xl p-1 m-1 font-black font-myBtn">
              +
            </span>
            <span className="text-lg font-text md:text-xl text-white font-semibold">
              Add Project
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="p-6 m-4 shadow-lg flex flex-col items-center justify-evenly cursor-pointer w-48 md:w-72 lg:w-1/2 lg:h-1/2 h-48 md:h-72 rounded-md bg-gray-900 hover:bg-green-700 transition duration-300"
            onClick={() => {
              navigate("/my/my-project-show");
            }}
          >
            <span className="text-green-400 text-8xl md:text-9xl p-1 m-1 font-black font-myBtn">
              *
            </span>
            <span className="text-lg font-text md:text-xl text-white font-semibold">
              Show Projects
            </span>
          </div>
        </div>
      </div>

      <div className="w-screen h-screen flex flex-col md:flex-row bg-gray-800 border-t-2 border-t-slate-600">
        <div className="flex-1 flex items-center justify-center">
          <div
            className="p-6 m-4 shadow-lg flex flex-col items-center justify-evenly cursor-pointer w-48 md:w-72 lg:w-1/2 lg:h-1/2 h-48 md:h-72 rounded-md bg-gray-900 hover:bg-blue-700 transition duration-300"
            onClick={() => {
              navigate("/admin-dashboard/add-skill");
            }}
          >
            <span className="text-blue-400 text-8xl md:text-9xl p-1 m-1 font-black font-myBtn">
              -
            </span>
            <span className="text-lg font-text md:text-xl text-white font-semibold">
              Add Skill
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="p-6 m-4 shadow-lg flex flex-col items-center justify-evenly cursor-pointer w-48 md:w-72 lg:w-1/2 lg:h-1/2 h-48 md:h-72 rounded-md bg-gray-900 hover:bg-green-700 transition duration-300"
            onClick={() => {
              navigate("/admin-dashboard/show-skill");
            }}
          >
            <span className="text-green-400 text-8xl md:text-9xl p-1 m-1 font-black font-myBtn">
              /
            </span>
            <span className="text-lg font-text md:text-xl text-white font-semibold">
              Show Skills
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
