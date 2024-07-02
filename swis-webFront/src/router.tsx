import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { BranchPage } from "./pages/BranchPage";

const  router = createBrowserRouter([
    {
        path : '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "Home" , element : <HomePage />},
            {path: "Branches" , element: <BranchPage />},
        ]   
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    }
]);
export default router;