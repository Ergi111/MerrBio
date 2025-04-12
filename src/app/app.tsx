import { createBrowserRouter, Outlet } from "react-router";
import { Toaster } from "sonner";
import { PublicRoutes } from "./PublicRouter";
import { PrivateRoutes } from "./PrivateRouter";
import { SignIn } from "../Pages/Auth/SignIn";
import ProductsPage from "../components/products-page";
import { LanguageProvider } from "../context/LanguageContext";
import Home from "../Pages/Home/Home";
import FarmerDashboard from "../Pages/Farmer/farmer-dashboard";
import FarmerProducts from "../Pages/Farmer/farmer-products";
import FarmerRequests from "../Pages/Farmer/farmer-requests";
import { AuthProvider } from "../context/useAuth";
import AuthLayout from "../Pages/Layout/AuthLayout";
import { routerPaths } from "../constants/routerPaths";
import { SignUp } from "../Pages/Auth/SignUp";
import NotFound from "../components/not-found";

export const AppLayout = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Outlet />
        <Toaster richColors />
      </LanguageProvider>
    </AuthProvider>
  );
};

export const App = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <AuthLayout />,
            children: [
              {
                element: <SignIn />,
                path: routerPaths.signIn,
              },
              {
                element: <SignUp />,
                path: routerPaths.signUp,
              },
            ],
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
