import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const check_admin = useSelector((state) => state.admin);

  return (
    <>
      {check_admin.isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to={"/admin-dashboard/admin-login"} />
      )}
    </>
  );
};

export default PrivateRoute;
