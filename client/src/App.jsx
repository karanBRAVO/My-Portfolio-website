import Home from "./Pages/Home";
import ShowProjects from "./Pages/ShowProjects";
import NoPage from "./Pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";

const App = () => {
  const loginState = useSelector((state) => state.login.credentials);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/my-project-show" element={<ShowProjects />} />
          {!loginState.token ? (
            <>
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/log-in" element={<Login />} />
            </>
          ) : (
            <></>
          )}
          <Route exact path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
