import { createBrowserRouter, Outlet } from "react-router";
import Test from "../Pages/test";
import { Toaster } from "sonner";
import { PublicRoutes } from "./PublicRouter";
import { PrivateRoutes } from "./PrivateRouter";

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
            element: <Test />,
            path: "/",
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
