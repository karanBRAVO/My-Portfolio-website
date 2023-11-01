import { useEffect, useState } from "react";
import Skeleton from "../Components/Profile/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { deleteMe, logout } from "../store/features/loginSlice";

const Profile = () => {
  const loginState = useSelector((state) => state.login.credentials);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    photoUrl: "",
    email: "",
  });

  useEffect(() => {
    setLoading(true);

    if (loginState.isLoggedIn) {
      setData({
        photoUrl: loginState.photoUrl,
        email: loginState.email,
      });
      setLoading(false);
    }
  }, [loginState]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAccount = () => {
    const checkSurity = confirm("Are you sure ?");
    if (checkSurity) {
      dispatch(deleteMe());
    }
  };

  return (
    <>
      <div className="fixed top-1 right-2 md:right-3 md:top-3 z-10">
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
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 m-1"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 m-1"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
