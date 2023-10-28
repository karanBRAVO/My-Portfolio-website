import Logo from "../assets/myLogo.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "../Components/auth/OAuth";

const SignUp = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setErrorStatus(null);
    setInputValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);
    setErrorStatus(null);

    if (!(inputValues.email.length > 0) || !(inputValues.password.length > 0)) {
      setErrorStatus("* Fields cannot be empty");
    } else {
      axios
        .post("/api/auth/log-in-user", inputValues)
        .then((res) => {
          if (!res.data.success) {
            setErrorStatus(res.data.message);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorStatus("Error while submitting form");
        });
    }
    setLoadingStatus(false);
  };

  return (
    <>
      <section
        className="w-full h-[100vh] flex items-center justify-center flex-col bg-slate-950"
        id="authSection"
      >
        <div className="p-3 border-2 border-solid border-sky-400 rounded-lg shadow-md shadow-sky-400 flex items-center justify-center flex-col">
          <img
            src={Logo}
            alt="photo"
            className="rounded-full w-12 h-12 object-cover border-2 border-solid border-white shadow-md shadow-white my-3"
          />
          <form
            onSubmit={handleSubmit}
            className="gap-3 flex flex-col items-center justify-center p-2"
          >
            <input
              className="px-2 py-1 rounded-md border-[1px] border-solid border-white text-white bg-transparent text-base font-semibold outline-none"
              type="email"
              name="email"
              id="useremail"
              placeholder="📧 Email *"
              autoComplete="off"
              value={inputValues.email}
              onChange={handleInputChange}
            />
            <input
              className="px-2 py-1 rounded-md border-[1px] border-solid border-white text-white bg-transparent text-base font-semibold outline-none"
              type="password"
              name="password"
              id="userpassword"
              placeholder="🔑 Password *"
              autoComplete="off"
              value={inputValues.password}
              onChange={handleInputChange}
            />
            <p className="text-base font-text font-normal text-red-500">
              {errorStatus ? <span>{errorStatus}</span> : <span></span>}
            </p>
            <button
              type="submit"
              disabled={loadingStatus}
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full hover:opacity-95 text-white font-myBtn text-base capitalize disabled:bg-blue-500 disabled:cursor-not-allowed"
            >
              {loadingStatus ? <>Logging up ...</> : <>Log in</>}
            </button>
            <OAuth />
          </form>
          <div className="mt-3">
            <p className="text-white text-sm font-text">
              Don{"'"}t have account ?
              <span
                onClick={() => {
                  navigate("/sign-up");
                }}
                className="text-base font-semibold text-blue-700 mx-1 cursor-pointer hover:underline"
              >
                Create-now
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
