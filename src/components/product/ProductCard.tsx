import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../context/LanguageContext";
import { User, ShoppingCart } from "lucide-react";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { useState } from "react";
import { Product } from "../../types/product";
import { useAuth } from "../../context/useAuth";
import { routerPaths } from "../../constants/routerPaths";
import { useNavigate } from "react-router";
import { useAskProduct } from "../../services/useAskProduct";
import { getRoleFlags } from "../../utils/getRoleFlags";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { currentUser } = useAuth();
  const { buyProduct } = useAskProduct();
  const { isUser } = getRoleFlags(currentUser?.role);
  const isBought = product?.buyer?.id === currentUser?.id;
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
        return "https://images.pexels.com/photos/2985167/pexels-photo-2985167.jpeg?auto=compress&cs=tinysrgb&w=1200";
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
  const formattedPrice = Number(product.price).toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={getCategoryImage(product.category)}
            // src={product.imageUrl}
            alt={product.imageUrl}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {product.productName}
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
              {/* €{Number(product.price).toFixed(2)}/{product.unit} */}€
              {formattedPrice}/kg
            </span>
            {isUser && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!currentUser) {
                    navigate(routerPaths.signIn);
                    return;
                  }
                  if (!isBought) {
                    buyProduct(product.id);
                  }
                }}
                // disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {t("requestToBuy")}
              </Button>
            )}
          </div>
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            <span>
              {t("farmer")}: {product.farmerName}
            </span>
          </div>
        </CardContent>
      </Card>
      <ProductDetailsModal
        onClose={() => setIsDetailsOpen(false)}
        open={isDetailsOpen}
        product={product}
      />
    </>
  );
}
