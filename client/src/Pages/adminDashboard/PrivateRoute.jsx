import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  return (
    <>
      {/* Change based on login status */}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
