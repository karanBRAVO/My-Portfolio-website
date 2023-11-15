import Home from "./Pages/Home";
import ShowProjects from "./Pages/ShowProjects";
import NoPage from "./Pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import Terms_of_Services from "./Pages/Terms_of_Services";
import Privacy_Policy from "./Pages/Privacy_Policy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowProjects_Admin from "./Pages/adminDashboard/ShowProjects_Admin";
import AddProjects_Admin from "./Pages/adminDashboard/AddProjects_Admin";
import PrivateRoute from "./Pages/adminDashboard/PrivateRoute";
import Admin from "./Pages/adminDashboard/Admin";
import UpdateProject from "./Pages/adminDashboard/UpdateProject";
import Admin_Login from "./Pages/adminDashboard/Admin_Login";
import Add_Skill from "./Pages/adminDashboard/Add_Skill";
import Show_Skill from "./Pages/adminDashboard/Show_Skill";

const App = () => {
  const loginState = useSelector((state) => state.login.credentials);
  const check_admin = useSelector((state) => state.admin);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/my-project-show/query"
            element={<ShowProjects />}
          />
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
          {check_admin.isAdmin ? (
            <></>
          ) : (
            <Route
              exact
              path="/admin-dashboard/admin-login"
              element={<Admin_Login />}
            />
          )}
          <Route element={<PrivateRoute />}>
            <Route exact path="/admin-dashboard" element={<Admin />} />
            <Route
              exact
              path="/my/my-project-show"
              element={<ShowProjects_Admin />}
            />
            <Route
              exact
              path="/my/add-project-new"
              element={<AddProjects_Admin />}
            />
            <Route
              exact
              path="/admin-dashboard/update-project/:id"
              element={<UpdateProject />}
            />
            <Route
              exact
              path="/admin-dashboard/add-skill"
              element={<Add_Skill />}
            />
            <Route
              exact
              path="/admin-dashboard/show-skill"
              element={<Show_Skill />}
            />
          </Route>
          <Route exact path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
