import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ProductForm } from "./product/ProductForm";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

export const AddProductModal = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { t } = useLanguage();
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          {t("addProduct")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("addNewProduct")}</DialogTitle>
        </DialogHeader>
        <ProductForm onSuccess={() => setIsAddDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
