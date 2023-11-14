import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin, faDashcube } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/myLogo.jpg";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";

const ShowProjects_Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/get-project-info")
      .then((response) => {
        if (response.data.success) {
          setData(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getData_search = async () => {
    if (searchData.length > 0) {
      setLoading(true);

      try {
        const response = await axios.get(
          `/api/get-project-info/by-search?searchInput=${searchData}`
        );
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-teal-900 p-3 w-screen flex flex-row items-center justify-around fixed bottom-0">
        <Link to={"/"}>
          <img
            src={Logo}
            alt="pic"
            className="mx-1 rounded-md w-16 hidden sm:block"
          />
        </Link>
        <div className="bg-teal-300 mx-1 flex items-center justify-between p-2 rounded-lg">
          <input
            type="search"
            name="search"
            id="search"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            onKeyDown={(e) => {
              const key = e.key;
              if (key == "Enter") {
                getData_search();
              }
            }}
            className="p-3 bg-transparent outline-none font-text"
            placeholder="Search"
            autoComplete="off"
          />
          <FontAwesomeIcon
            icon={faSearchengin}
            className="text-teal-950 text-3xl cursor-pointer"
            onClick={() => {
              getData_search();
            }}
          />
        </div>
        <div className="mx-1">
          <FontAwesomeIcon
            icon={faDashcube}
            title="Admin Dashboard"
            className="text-teal-950 cursor-pointer text-3xl"
            onClick={() => {
              navigate("/admin-dashboard");
            }}
          />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-row flex-wrap mx-1 mb-24">
          {data.map((value, index) => {
            return (
              <div key={index} className="p-3 m-1">
                <ProjectCard
                  id={value._id}
                  createdAt={value.createdAt}
                  updatedAt={value.updatedAt}
                  name={value.projectName}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ShowProjects_Admin;
