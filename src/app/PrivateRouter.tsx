import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { routerPaths } from "../constants/routerPaths";
import { useEffect } from "react";

export const PrivateRoutes = () => {
  const { userLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) {
      return;
    }
    console.log("User loading:", userLoading);
    console.log("Is authenticated:", isAuthenticated);
    if (!isAuthenticated) {
      navigate(routerPaths.signIn);
    }
    console.log("User is authenticated:", isAuthenticated);
  }, [isAuthenticated, navigate, userLoading]);

  return <Outlet />;
};
