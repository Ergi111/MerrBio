import { useLanguage } from "../../context/LanguageContext";
// import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "../../components/NavBar";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Package, ShoppingCart, PlusCircle, ChevronRight } from "lucide-react";

export default function FarmerDashboard() {
  const { t } = useLanguage();
  const user = [{ id: 1, name: "John Doe", role: "farmer" }];
  const products = [
    { id: 1, name: "Tomatoes", price: 2.5, unit: "kg", inStock: true },
    { id: 2, name: "Potatoes", price: 1.5, unit: "kg", inStock: false },
  ];
  const requests = [
    { id: 1, quantity: 10, status: "pending" },
    { id: 2, quantity: 5, status: "approved" },
  ];

  // Fetch pending purchase requests

  // Filter pending requests
  const pendingRequests =
    requests?.filter((req) => req.status === "pending") || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {t("farmerDashboard")}
            </h1>
            <p className="text-gray-500 mt-1">
              {t("welcomeFarmer")}, {user[0]?.name}!
            </p>
          </header>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">
                  {t("totalProducts")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    {products?.length || 0}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {t("products")}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">
                  {t("pendingRequests")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    {pendingRequests.length}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {t("requests")}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-500">
                  {t("accountType")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-xl font-semibold text-primary capitalize">
                    {t("farmer")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {t("quickActions")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link to="/farmer/products">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-2"
                >
                  <Package className="h-6 w-6 text-primary" />
                  <span>{t("manageProducts")}</span>
                </Button>
              </Link>
              <Link to="/farmer/requests">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-2"
                >
                  <ShoppingCart className="h-6 w-6 text-amber-500" />
                  <span>{t("viewRequests")}</span>
                </Button>
              </Link>
              <Link to="/farmer/products">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-2"
                >
                  <PlusCircle className="h-6 w-6 text-green-500" />
                  <span>{t("addNewProduct")}</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="recent-products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="recent-products">
                {t("recentProducts")}
              </TabsTrigger>
              <TabsTrigger value="recent-requests">
                {t("recentRequests")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent-products" className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {t("recentlyAddedProducts")}
                  </h3>
                  <Link to="/farmer/products">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary flex items-center"
                    >
                      {t("viewAll")}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="divide-y">
                  {products?.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          €{Number(product.price).toFixed(2)}/{product.unit}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? t("inStock") : t("outOfStock")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recent-requests" className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {t("recentPurchaseRequests")}
                  </h3>
                  <Link to="/farmer/requests">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary flex items-center"
                    >
                      {t("viewAll")}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="divide-y">
                  {pendingRequests.slice(0, 5).map((request) => (
                    <div key={request.id} className="py-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {t("requestIdShort")}: #{request.id}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {t("quantityValueUnit", {
                              quantity: Number(request.quantity).toString(),
                              unit: "kg",
                            })}
                          </p>
                        </div>
                        <div>
                          <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs">
                            {t("pending")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
