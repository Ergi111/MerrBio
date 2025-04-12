import { Link, useLocation } from "react-router";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext"; // Updated to use alias
import { Button } from "../components/ui/button"; // Updated to use alias

import { Leaf, Menu, X } from "lucide-react";
import {} from "../components/ui/dropdown";
import { LanguageDropdown } from "./LanguageDropdown";
import { UserDropdown } from "./UserDropdown";

export function Navbar() {
  const user = {
    id: 1,
    name: "John Doe",
    role: "farmer",
  };
  const logoutMutation = {
    mutate: async () => {
      try {
        // Replace with your actual logout API call or logic
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/auth"; // Redirect to login page after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-6 w-6 text-primary mr-2" />
              <span className="font-semibold text-xl text-primary">
                FreshFarm
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-gray-800 hover:text-primary px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/" ? "text-primary" : ""
              }`}
            >
              {t("home")}
            </Link>
            <Link
              to="/products"
              className={`text-gray-800 hover:text-primary px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/products" ? "text-primary" : ""
              }`}
            >
              {t("products")}
            </Link>

            <LanguageDropdown />

            {/* Auth Buttons or User Menu */}
            {!user ? (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button
                    variant="outline"
                    className="text-primary border-primary hover:bg-primary/5"
                  >
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    {t("register")}
                  </Button>
                </Link>
              </div>
            ) : (
              <UserDropdown />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-primary"
            >
              {t("home")}
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-primary"
            >
              {t("products")}
            </Link>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Language Toggle */}
            <div className="px-3 py-2">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-600">
                  {t("language")}:
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </Button>
                  <Button
                    variant={language === "sq" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("sq")}
                  >
                    Shqip
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Auth Buttons for Mobile */}
            {!user ? (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link to="/auth">
                  <Button variant="outline" className="w-full">
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="w-full">{t("register")}</Button>
                </Link>
              </div>
            ) : (
              <div className="px-3 py-2">
                <div className="flex items-center mb-3">
                  <span className="text-base font-medium">{user.name}</span>
                  <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {user.role === "farmer" ? t("farmer") : t("consumer")}
                  </span>
                </div>
                <div className="space-y-1">
                  {user.role === "farmer" && (
                    <>
                      <Link
                        to="/farmer/dashboard"
                        className="block py-2 text-base text-gray-800 hover:text-primary"
                      >
                        {t("dashboard")}
                      </Link>
                      <Link
                        to="/farmer/products"
                        className="block py-2 text-base text-gray-800 hover:text-primary"
                      >
                        {t("myProducts")}
                      </Link>
                      <Link
                        to="/farmer/requests"
                        className="block py-2 text-base text-gray-800 hover:text-primary"
                      >
                        {t("purchaseRequests")}
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => logoutMutation.mutate()}
                    className="block w-full text-left py-2 text-base text-gray-800 hover:text-primary"
                  >
                    {t("logout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
