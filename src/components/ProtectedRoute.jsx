import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
