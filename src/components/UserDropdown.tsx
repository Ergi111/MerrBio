import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/useAuth";
import { UserAvatar } from "./user/UserAvatar";
import { getRoleFlags } from "../utils/getRoleFlags";
import { Link } from "react-router";
import { routerPaths } from "../constants/routerPaths";

export const UserDropdown = () => {
  const { t } = useLanguage();
  const { signOut, currentUser, isAuthenticated } = useAuth();
  const { isFarmer, isAdmin } = getRoleFlags(currentUser?.role);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="cursor-pointer">
        <UserAvatar name={currentUser?.fullName} id={currentUser?.id} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to={routerPaths.adminDashboard}>{t("dashboard")}</Link>
          </DropdownMenuItem>
        )}
        {isFarmer && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/farmer/products">{t("myProducts")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/farmer/requests">{t("purchaseRequests")}</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild>
          <Link to="/products">{t("browseProducts")}</Link>
        </DropdownMenuItem>
        {isAuthenticated && (
          <DropdownMenuItem onClick={signOut}>{t("logout")}</DropdownMenuItem>
        )}

        {!isAuthenticated && (
          <DropdownMenuItem asChild>
            <Link to={routerPaths.signIn}>{t("login")}</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
