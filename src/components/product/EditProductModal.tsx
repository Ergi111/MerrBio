import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { useLanguage } from "../../context/LanguageContext";
import { ProductForm } from "./ProductForm";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "../../types/product";
interface EditProductModalProps {
  product: Product;
}

export const EditProductModal = ({ product }: EditProductModalProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { t } = useLanguage();
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1">
          <Pencil className="h-4 w-4 mr-1" />
          {t("edit")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <DialogTitle>{t("editProduct")}</DialogTitle>
        </AlertDialogHeader>
        <ProductForm
          product={product}
          onSuccess={() => setIsEditDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
