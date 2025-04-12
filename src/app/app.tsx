import { createBrowserRouter, Outlet } from "react-router";
import Test from "../Pages/test";
import { Toaster } from "sonner";
import { PublicRoutes } from "./PublicRouter";
import { PrivateRoutes } from "./PrivateRouter";
import { SignUp } from "../Pages/Auth/SignUp";
import { SignIn } from "../Pages/Auth/SignIn";

export const AppLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
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
            element: <SignUp />,
            path: "/",
          },
          {
            element: <SignIn />,
            path: "/sign-in",
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
