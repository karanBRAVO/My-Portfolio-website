import { useEffect, useRef, useState } from "react";
import Skeleton from "../Components/Profile/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMe,
  logout,
  setInfo,
  updateImage,
} from "../store/features/loginSlice";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const loginState = useSelector((state) => state.login.credentials);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    photoUrl: "",
    email: "",
  });
  const [userProfilePhotoUrl, setUserProfilePhotoUrl] = useState(undefined);

  const fileRef = useRef();

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

  useEffect(() => {
    if (userProfilePhotoUrl) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + userProfilePhotoUrl.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, userProfilePhotoUrl);

      uploadTask.on(
        "state_changed",
        (snap_shot) => {
          const progress =
            (snap_shot.bytesTransferred / snap_shot.totalBytes) * 100;
        },
        (err) => {
          toast.error(err, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              setData({
                ...data,
                photoUrl: downloadUrl,
              });
              axios
                .post(
                  `${
                    import.meta.env.VITE_API_BASE_URL
                  }/api/profile/upload-image`,
                  { newPhotoUrl: downloadUrl },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
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
                    dispatch(updateImage({ photoUrl: downloadUrl }));
                  } else {
                    // deleting from firebase
                    const imageRef = ref(storage, fileName);
                    deleteObject(imageRef)
                      .then(() => {
                        console.log("deleted from firebase");
                      })
                      .catch(() => {
                        console.error("Cannot delete from firebase");
                      });

                    if (res.data.jwtError) {
                      dispatch(
                        setInfo({ email: "", photoUrl: "", isLoggedIn: false })
                      );
                      navigate("/sign-up");
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
                  }
                  setUserProfilePhotoUrl(undefined);
                })
                .catch((err) => {
                  toast.error(err, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                });
            })
            .catch((err) => {
              toast.error(err, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            });
        }
      );
    }
  }, [userProfilePhotoUrl]);

  const handleFileChange = (e) => {
    setUserProfilePhotoUrl(e.target.files[0]);
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
              <input
                type="file"
                name="userProfilePhotoUrl"
                ref={fileRef}
                id="imageUrl"
                hidden={true}
                accept="image/*"
                onChange={handleFileChange}
              />
              <img
                src={data.photoUrl}
                alt="Profile"
                className="mx-auto w-32 h-32 rounded-full mb-4 cursor-pointer border-gray-600 border-2 border-solid"
                onClick={() => {
                  fileRef.current.click();
                }}
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
