import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Error from "./components/Error.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { AuthContext, AuthProvider } from "./AuthContext.jsx";
import Layout from "./Layout.jsx";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { MultiSelectTheme } from "chakra-multiselect";

const queryClient = new QueryClient();
const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient} theme={theme}>
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
