import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../store/features/adminSlice.js";

const Logout_Admin = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => {
          dispatch(logoutAdmin());
        }}
        className="text-white bg-black p-3 rounded-md fixed w-fit left-0 bottom-0 m-1 z-10 cursor-pointer"
      >
        <span>Logout</span>
      </div>
    </>
  );
};

export default Logout_Admin;
