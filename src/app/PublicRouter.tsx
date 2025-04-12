import { Outlet } from "react-router";
import { Navbar } from "../components/NavBar";

export const PublicRoutes = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
