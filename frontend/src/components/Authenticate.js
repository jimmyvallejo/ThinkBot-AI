import React from "react";
import { Navigate } from "react-router-dom";

const Authenticate = ({ component: Component, ...rest }) => {
  //   const navigate = useNavigate();
  //   const user = sessionStorage.getItem("user");
  const user = {};

  return user ? <Component /> : <Navigate to="/login" replace />;
};

export default Authenticate;
