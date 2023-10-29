import Nav from "../Components/Navbar/Nav";
import Masthead from "../Sections/Masthead";
import Project from "../Sections/Project";
import About from "../Sections/About";
import Contact from "../Sections/Contact";
import Footer from "../Sections/Footer";

const Home = () => {
  return (
    <>
      <Nav />
      <Masthead />
      <Project />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
