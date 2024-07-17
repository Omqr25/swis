import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { BranchPage } from "./pages/BranchPage";
import { SettingPage } from "./pages/SettingPage";
import { Languages } from "./components/Setting/Languages";
import { WarehousePage } from "./pages/WarehousePage";
import { UserPage } from "./pages/UserPage";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <Layout /> : <Navigate to="/login" />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: isAuthenticated() ? <HomePage /> : <Navigate to="/login" />,
      },
      {
        path:'Home',
        element:isAuthenticated() ? <HomePage /> : <Navigate to="/login" />,
      },
      {
        path: "Branches",
        element: isAuthenticated() ? <BranchPage /> : <Navigate to="/login" />,
      },
      {
        path: "Warehouses",
        element: isAuthenticated() ? (
          <WarehousePage />
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: "Users",
        element: isAuthenticated() ? <UserPage /> : <Navigate to="/login" />
      },
      {
        path: "Settings",
        element: isAuthenticated() ? <SettingPage /> : <Navigate to="/login" />,
        children: [
          {
            path: "Languages",
            element: isAuthenticated() ? (
              <Languages />
            ) : (
              <Navigate to="/login" />
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
