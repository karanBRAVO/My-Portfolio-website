import Home from "./Pages/Home";
import ShowProjects from "./Pages/ShowProjects";
import NoPage from "./Pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import Terms_of_Services from "./Pages/Terms_of_Services";
import Privacy_Policy from "./Pages/Privacy_Policy";

const App = () => {
  const loginState = useSelector((state) => state.login.credentials);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/my-project-show" element={<ShowProjects />} />
          {!loginState.isLoggedIn ? (
            <>
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/log-in" element={<Login />} />
            </>
          ) : (
            <></>
          )}
          <Route exact path="/my/privacy-policy" element={<Privacy_Policy />} />
          <Route
            exact
            path="/my/terms-of-services"
            element={<Terms_of_Services />}
          />
          <Route exact path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
