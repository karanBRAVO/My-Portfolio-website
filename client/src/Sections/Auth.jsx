import Logo from "../assets/myLogo.jpg";
import { useState } from "react";

const Auth = () => {
  const [accountStatus, setAccountStatus] = useState(false);

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);
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
            <button
              type="submit"
              className="py-2 px-3 bg-blue-700 rounded-md border-2 border-solid border-blue-700 hover:opacity-95 text-white font-myBtn text-base capitalize"
            >
              {accountStatus ? <>Login</> : <>Sign up</>}
            </button>
          </form>
          <div className="mt-3">
            <p className="text-white text-sm font-text">
              {accountStatus ? (
                <>
                  Don{"'"}t have account
                  <span
                    onClick={() => {
                      setAccountStatus(!accountStatus);
                    }}
                    className="text-base font-semibold text-blue-700 mx-1 cursor-pointer hover:underline"
                  >
                    Create now
                  </span>
                </>
              ) : (
                <>
                  Have an account ?
                  <span
                    onClick={() => {
                      setAccountStatus(!accountStatus);
                    }}
                    className="text-base font-semibold text-blue-700 mx-1 cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
