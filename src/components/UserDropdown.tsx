import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { useLanguage } from "../context/LanguageContext";

export const UserDropdown = () => {
  const { t } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center">
          <span className="font-medium">{"userNAME "}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* {user.role === "farmer" ? (
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
        )} */}
        <DropdownMenuItem onClick={() => {}}>{t("logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
