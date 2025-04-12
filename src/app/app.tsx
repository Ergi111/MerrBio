import { createBrowserRouter, Outlet } from "react-router";
import { Toaster } from "sonner";
import { PublicRoutes } from "./PublicRouter";
import { PrivateRoutes } from "./PrivateRouter";
import { SignIn } from "../Pages/Auth/SignIn";
import ProductsPage from "../Pages/Client/products-page";
import { LanguageProvider } from "../context/LanguageContext";
import AuthPage from "../Pages/Client/auth-page";
import Home from "../Pages/Home/Home";
import FarmerDashboard from "../Pages/Farmer/farmer-dashboard";
import FarmerProducts from "../Pages/Farmer/farmer-products";
import FarmerRequests from "../Pages/Farmer/farmer-requests";

export const AppLayout = () => {
  return (
    <LanguageProvider>
      <Outlet />
      <Toaster />
    </LanguageProvider>
  );
};

export const App = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <SignIn />,
            path: "/sign-in",
          },
          {
            element: <AuthPage />,
            path: "/signin",
          },
          {
            element: <ProductsPage />,
            path: "/products",
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <FarmerDashboard />,
            path: "/farmer",
          },
          {
            element: <FarmerProducts />,
            path: "/farmer/products",
          },
          {
            element: <FarmerRequests />,
            path: "/farmer/requests",
          },
        ],
      },
    ],
  },
]);
