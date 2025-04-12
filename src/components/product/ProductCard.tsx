import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../context/LanguageContext";
// import { useState } from "react";
// import { useAuth } from "@/hooks/use-auth";
import { User, ShoppingCart } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { InsertProduct } from "../../schema/schema";

interface ProductCardProps {
  product: InsertProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  // const { user } = useAuth();
  // const { toast } = useToast();
  // const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  interface ToastOptions {
    title: string;
    description: string;
    variant: "success" | "error" | "destructive" | "info";
  }

  const toast = (options: ToastOptions) => {
    console.log(options.title);
    console.log(options.description);
    console.log(options.variant);
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "vegetables":
        return "bg-primary/10 text-primary";
      case "fruits":
        return "bg-amber-500/10 text-amber-500";
      case "dairy":
        return "bg-amber-700/10 text-amber-700";
      case "meat":
        return "bg-red-500/10 text-red-500";
      case "poultry":
        return "bg-amber-700/10 text-amber-700";
      case "bakery":
        return "bg-amber-500/10 text-amber-500";
      case "specialty":
        return "bg-amber-500/10 text-amber-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Placeholder images for products by category
  const getCategoryImage = (category: string) => {
    switch (category.toLowerCase()) {
      case "vegetables":
        return "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&h=400&q=80";
      case "fruits":
        return "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&h=400&q=80";
      case "dairy":
        return "https://images.unsplash.com/photo-1621265838864-d814e5a33b78?auto=format&fit=crop&w=800&h=400&q=80";
      case "meat":
        return "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&h=400&q=80";
      case "poultry":
        return "https://images.unsplash.com/photo-1571680322279-a226e7259614?auto=format&fit=crop&w=800&h=400&q=80";
      case "bakery":
        return "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&h=400&q=80";
      case "specialty":
        return "https://images.unsplash.com/photo-1628689469838-524a4a973b8e?auto=format&fit=crop&w=800&h=400&q=80";
      default:
        return "https://images.unsplash.com/photo-1595506635416-cd66df435f07?auto=format&fit=crop&w=800&h=400&q=80";
    }
  };

  const handleRequestClick = () => {
    if (!user) {
      toast({
        title: t("loginRequired"),
        description: t("loginToRequestProduct"),
        variant: "destructive",
      });
      return;
    }

    if (user.role === "farmer") {
      toast({
        title: t("cannotBuyAsfarmer"),
        description: t("switchToConsumerAccount"),
        variant: "destructive",
      });
      return;
    }

    // setIsRequestModalOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={getCategoryImage(product.category)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            <Badge className={getCategoryColor(product.category)}>
              {product.category}
            </Badge>
          </div>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              €{Number(product.price).toFixed(2)}/{product.unit}
            </span>
            <Button
              size="sm"
              onClick={handleRequestClick}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {t("requestToBuy")}
            </Button>
          </div>
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            <span>
              {t("farmer")}: {product.farmerName}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* {isRequestModalOpen && (
        <RequestModal
          product={product}
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
        />
      )} */}
    </>
  );
}
