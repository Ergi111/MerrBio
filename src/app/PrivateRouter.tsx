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
    if (!isAuthenticated) {
      navigate(routerPaths.signIn);
    }
  }, [isAuthenticated, navigate, userLoading]);

  return <Outlet />;
};
