import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PageHeaderProps {
  title: string;
  subTitle: string;
}
export const PageHeader = ({ title, subTitle }: PageHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <div className="flex flex-col mb-8 items-start">
      <Button
        variant="ghost"
        size="sm"
        className="mr-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        {t("back")}
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{subTitle}</p>
      </div>
    </div>
  );
};
