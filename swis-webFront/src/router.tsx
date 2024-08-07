import { createBrowserRouter, Navigate } from "react-router-dom";
import { Languages } from "./components/Setting/Languages";
import { BranchPage } from "./pages/BranchPage";
import { DonorPage } from "./pages/DonorPage";
import { DriverPage } from "./pages/DriverPage";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { KeeperPage } from "./pages/KeeperPage";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ProductPage } from "./pages/ProductPage";
import { SettingPage } from "./pages/SettingPage";
import { WarehousePage } from "./pages/WarehousePage";

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
        path: "Home",
        element: isAuthenticated() ? <HomePage /> : <Navigate to="/login" />,
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
        path: "Keepers",
        element: isAuthenticated() ? <KeeperPage /> : <Navigate to="/login" />,
      },
      {
        path: "Donors",
        element: isAuthenticated() ? <DonorPage /> : <Navigate to="/login" />,
      },
      {
        path: "Drivers",
        element: isAuthenticated() ? <DriverPage /> : <Navigate to="/login" />,
      },
      {
        path: "Products",
        element: isAuthenticated() ? <ProductPage /> : <Navigate to="/login" />,
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
