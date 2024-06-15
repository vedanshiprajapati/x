import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Error from "./components/Error.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
