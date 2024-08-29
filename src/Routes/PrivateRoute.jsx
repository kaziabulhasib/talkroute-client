import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  // console.log("pathnaem: ", location.pathname);
  if (loading) {
    return <span className='loading loading-bars loading-md'></span>;
  }
  if (user) {
    return children;
  }
  return <Navigate to='/login' state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;
