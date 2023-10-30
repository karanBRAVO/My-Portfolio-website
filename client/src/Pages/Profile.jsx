import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../Components/Profile/Skeleton";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    photoUrl: "",
    email: "",
  });

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/api/profile/get-user", {
          headers: {
            Authorization: `Bearer: ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.success) {
            setData({
              email: res.data.data.email,
              photoUrl: res.data.data.photoUrl,
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const logout = () => {};

  return (
    <>
      <div className="fixed ml-[110px] sm:ml-[120px] md:ml-[130px] z-10">
        <div className="bg-white p-5 rounded-lg shadow-md shadow-slate-400 flex items-center justify-center flex-col">
          {loading ? (
            <>
              <Skeleton />
            </>
          ) : (
            <>
              <img
                src={data.photoUrl}
                alt="Profile"
                className="mx-auto w-32 h-32 rounded-full mb-4"
              />
              <div className="mt-4 p-1">
                <h2 className="text-lg font-bold mb-2">Contact</h2>
                <p className="text-gray-700">{data.email}</p>
              </div>
            </>
          )}
          <div className="mt-4 text-center">
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
