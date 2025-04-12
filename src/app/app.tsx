import { createBrowserRouter, Outlet } from "react-router";
import Test from "../Pages/test";
import { Toaster } from "sonner";
import { PublicRoutes } from "./PublicRouter";
import { PrivateRoutes } from "./PrivateRouter";
import { SignIn } from "../Pages/Auth/SignIn";
import ProductsPage from "../Pages/Client/products-page";
import { LanguageProvider } from "../context/LanguageContext";
import AuthPage from "../Pages/Client/auth-page";
import Home from "../Pages/Home/Home";

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
            element: <Test />,
            path: "/private",
          },
        ],
      },
    ],
  },
]);
