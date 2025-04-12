import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteProduct } from "../../services/useDeleteProduct";

export const DeleteProductModal = ({ productId }: { productId: string }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { t } = useLanguage();
  const { deleteProduct, loading } = useDeleteProduct();
  const handleDelete = async () => {
    await deleteProduct({ productId });
    setIsDeleteDialogOpen(false);
  };
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          {t("delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteProductConfirmation")}{" "}
            {/* <span className="font-medium">{selectedProduct?.name}</span> */}
            {t("thisActionCannot")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
