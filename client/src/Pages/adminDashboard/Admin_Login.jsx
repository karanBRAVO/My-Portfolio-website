import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAdmin } from "../../store/features/adminSlice";

const Admin_Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [passkeys, setPasskeys] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  const handleDelete = (i) => {
    const newPasskeys = [...passkeys];
    newPasskeys.splice(i, 1);
    setPasskeys(newPasskeys);
  };

  const handleAddition = (tag) => {
    setPasskeys([...passkeys, tag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus(true);

    // Validate passkeys length
    if (
      passkeys.length !== 12 ||
      new Set(passkeys.map((tag) => tag.text)).size !== passkeys.length
    ) {
      alert("Passkeys must be 12 different values.");
      return;
    }

    // Extract passkey values
    const passkeysArray = passkeys.map((tag) => tag.text);

    // Send data to backend
    try {
      const response = await axios.post(`/api/login-admin`, {
        username,
        passkeys: passkeysArray,
      });
      if (response.data.success) {
        const token = response.data.token;
        dispatch(setIsAdmin({ isAdmin: true, token: token }));
        navigate("/admin-dashboard");
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(response.data.message, {
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
      toast.error("Error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setLoginStatus(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="passkeys"
                className="block text-sm w-full m-1 font-medium text-gray-700"
              >
                Passkeys (12 different values)
              </label>
              <div className="mt-1">
                <ReactTags
                  tags={passkeys}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  placeholder="Add a passkey"
                  classNames={{
                    tags: "flex flex-wrap gap-2 mt-3",
                    tag: "bg-indigo-500 text-white rounded-md px-2 py-0 m-[2px]",
                    tagInput:
                      "w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                    remove: "text-white ml-1 cursor-pointer",
                  }}
                />
              </div>
              {passkeys.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  Click on a passkey to remove it.
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loginStatus}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {loginStatus ? <span>Logging in...</span> : <span>Log In</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin_Login;
