import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import App from "./App";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
