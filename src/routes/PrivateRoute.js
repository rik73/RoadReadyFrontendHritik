import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // Make sure the import is correct

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
