import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "./Context/GlobalContext";

const PrivateRoute = ({ component: Component }) => {
  const { isLogin } = useContext(GlobalContext);

  return isLogin ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
