import Home from "./Pages/Home";
import ShowProjects from "./Pages/ShowProjects";
import Auth from "./Sections/Auth";
import NoPage from "./Sections/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/my-project-show" element={<ShowProjects />} />
          <Route exact path="/authenticate-user" element={<Auth />} />
          <Route exact path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
