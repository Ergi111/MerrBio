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
              src={product.imageUrl}
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
