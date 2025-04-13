import { useLanguage } from "../../context/LanguageContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { SignUp } from "../Auth/SignUp";
import { SignIn } from "../Auth/SignIn";
import { useAuth } from "../../context/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { routerPaths } from "../../constants/routerPaths";

export default function AuthLayout() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated, userLoading } = useAuth();

  useEffect(() => {
    if (userLoading) {
      return;
    }
    if (isAuthenticated) {
      navigate(routerPaths.default);
    }
  }, [isAuthenticated, navigate, userLoading]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Hero section (left on mobile, right on desktop) */}
              <div className="md:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-8 text-white flex flex-col justify-center md:order-2">
                <h2 className="text-3xl font-bold mb-4">
                  {t("authHeroTitle")}
                </h2>
                <p className="mb-6">{t("authHeroDescription")}</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit2")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit3")}</span>
                  </li>
                </ul>
              </div>

              {/* Auth forms */}
              <div className="md:w-1/2 p-8 md:order-1">
                <Tabs className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">{t("login")}</TabsTrigger>
                    <TabsTrigger value="register">{t("register")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <SignIn />
                  </TabsContent>

                  <TabsContent value="register">
                    <SignUp />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
