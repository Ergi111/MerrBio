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

export const UserDropdown = () => {
  const { t } = useLanguage();
  const { signOut, currentUser } = useAuth();
  const { isFarmer, isAdmin } = getRoleFlags(currentUser?.role);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <UserAvatar name={currentUser?.fullName} id={currentUser?.id} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isFarmer ? (
          <>
            <DropdownMenuItem asChild>
              <Link to="/farmer/dashboard">{t("dashboard")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/farmer/products">{t("myProducts")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/farmer/requests">{t("purchaseRequests")}</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link to="/products">{t("browseProducts")}</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={signOut}>{t("logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
