import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useLanguage } from "../../context/LanguageContext";
import { Product } from "../../types/product";

interface ProductDetailsModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}
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
export const ProductDetailsModal = ({
  product,
  open,
  onClose,
}: ProductDetailsModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("purchaseRequestDetails")}</DialogTitle>
          <DialogDescription>
            {t("requestIdLabel")}: #{product.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {product.productName}
          </h3>

          <div className="w-full h-60 overflow-hidden rounded-lg border">
            <img
              src={getCategoryImage(product.category)}
              alt={product.productName}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
            <div>
              <span className="font-medium">{t("price")}:</span> €
              {Number(product.price).toFixed(2)}/kg
            </div>
            <div>
              <span className="font-medium">{t("category")}:</span>{" "}
              {product.category}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-medium">{t("farmer")}:</span>{" "}
            {product.farmerName}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
