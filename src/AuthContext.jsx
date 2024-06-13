import React, { createContext, useEffect, useState } from "react";
import { dummyCredentials } from "./utils/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (
      username === dummyCredentials.username &&
      password === dummyCredentials.password
    ) {
      setIsAuthenticated(true);
      setUser({ username });
      return {
        message: "authentication successful",
        success: true,
      };
    } else {
      return {
        message: "your password or username is incorrect",
        success: false,
      };
    }
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
