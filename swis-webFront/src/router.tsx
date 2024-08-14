import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProductSearch } from "./components/Product/ProductSearch";
import { Languages } from "./components/Setting/Languages";
import ListTabs from "./components/Setting/ListTabs";
import { BranchPage } from "./pages/BranchPage";
import { CreateTransactionPage } from "./pages/CreateTransactionPage";
import { DonorPage } from "./pages/DonorPage";
import { DriverPage } from "./pages/DriverPage";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { KeeperPage } from "./pages/KeeperPage";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ProductPage } from "./pages/ProductPage";
import { SettingPage } from "./pages/SettingPage";
import { TransactionPage } from "./pages/TransactionPage";
import { WarehousePage } from "./pages/WarehousePage";
import ReportsPage from "./pages/ReportsPage";

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
        path: "Drivers",
        element: isAuthenticated() ? <DriverPage /> : <Navigate to="/login" />,
      },
      {
        path: "Donors",
        element: isAuthenticated() ? <DonorPage /> : <Navigate to="/login" />,
      },
      {
        path: "Items",
        element: isAuthenticated() ? <ProductPage /> : <Navigate to="/login" />,
      },
      {
        path: "Transactions",
        element: isAuthenticated() ? <TransactionPage /> : <Navigate to="/login" />,  
      },
      {
        path: "Reports",
        element: isAuthenticated() ? <ReportsPage /> : <Navigate to="/login" />,  
      },
      {
        path : "Transactions/Create",
        element: isAuthenticated() ? <CreateTransactionPage /> : <Navigate to="/login" />,   
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
          {
            path:"DeletedItems",
            element : isAuthenticated() ? (
              <ListTabs />
            ) : (
              <Navigate to="/login" />
            ),
          }
        ],
      },
      {
        path: "Search/Branches",
        element: isAuthenticated() ? <BranchPage /> : <Navigate to="/login" />,
      },
      {
        path: "Search/Warehouses",
        element: isAuthenticated() ? (
          <WarehousePage />
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: "Search/Keepers",
        element: isAuthenticated() ? <KeeperPage /> : <Navigate to="/login" />,
      },
      {
        path: "Search/Drivers",
        element: isAuthenticated() ? <DriverPage /> : <Navigate to="/login" />,
      },
      {
        path: "Search/Donors",
        element: isAuthenticated() ? <DonorPage /> : <Navigate to="/login" />,
      },
      {
        path : "Search/Items",
        element:  isAuthenticated() ? (
          <ProductSearch />
        ) : (
          <Navigate to="/login" />
        ),
      },
      {
        path: "Search/Transactions",
        element: isAuthenticated() ? <TransactionPage /> : <Navigate to="/login" />,  
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
