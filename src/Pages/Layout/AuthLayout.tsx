import { useLanguage } from "../../context/LanguageContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useAuth } from "../../context/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { routerPaths } from "../../constants/routerPaths";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthLayout() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated, userLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (userLoading) {
      return;
    }
    if (isAuthenticated) {
      navigate(routerPaths.default);
    }
  }, [isAuthenticated, navigate, userLoading]);

  // Determine which tab is active based on current path
  const isSignInPath = location.pathname === routerPaths.signIn;
  const isSignUpPath = location.pathname === routerPaths.signUp;
  const activeTab = isSignUpPath ? routerPaths.signUp : routerPaths.signIn;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      layout
    >
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Hero section (left on mobile, right on desktop) */}
              <motion.div
                className="md:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-8 text-white flex flex-col justify-center md:order-2"
                variants={itemVariants}
                layout
              >
                <motion.h2
                  className="text-3xl font-bold mb-4"
                  variants={itemVariants}
                >
                  {t("authHeroTitle")}
                </motion.h2>
                <motion.p className="mb-6" variants={itemVariants}>
                  {t("authHeroDescription")}
                </motion.p>
                <motion.ul className="space-y-3">
                  <motion.li
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit1")}</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit2")}</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit3")}</span>
                  </motion.li>
                </motion.ul>
              </motion.div>

              {/* Auth forms */}
              <motion.div
                className="md:w-1/2 p-8 md:order-1"
                variants={itemVariants}
                layout
              >
                <Tabs className="w-full" value={activeTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value={routerPaths.signIn}
                      onClick={() => navigate(routerPaths.signIn)}
                    >
                      {t("login")}
                    </TabsTrigger>
                    <TabsTrigger
                      value={routerPaths.signUp}
                      onClick={() => navigate(routerPaths.signUp)}
                    >
                      {t("register")}
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <TabsContent value={routerPaths.signIn}>
                      {isSignInPath && (
                        <motion.div
                          key="signin"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={tabContentVariants}
                          layout
                        >
                          <Outlet />
                        </motion.div>
                      )}
                    </TabsContent>

                    <TabsContent value={routerPaths.signUp}>
                      {isSignUpPath && (
                        <motion.div
                          key="signup"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={tabContentVariants}
                          layout
                        >
                          <Outlet />
                        </motion.div>
                      )}
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
