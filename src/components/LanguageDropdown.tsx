import { ChevronDown, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { useLanguage } from "../context/LanguageContext";

export const LanguageDropdown = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center">
          <Globe className="h-4 w-4 mr-1" />
          <span>{language === "en" ? "EN" : "SQ"}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("sq")}>
          Shqip
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
