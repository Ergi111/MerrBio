import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
// import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "../../components/NavBar";
// import { useQuery, useMutation } from "@tanstack/react-query";
import { ProductForm } from "../../components/product/ProductForm";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest, queryClient } from "@/lib/queryClient";
import { PlusCircle, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router";

export default function FarmerProducts() {
  const { t } = useLanguage();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Tomatoes",
      price: 2.5,
      unit: "kg",
      inStock: true,
      description: "Fresh and organic tomatoes",
      category: "Vegetables",
    },
    {
      id: 2,
      name: "Potatoes",
      price: 1.5,
      unit: "kg",
      inStock: false,
      description: "High-quality potatoes",
      category: "Vegetables",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Link to="/farmer">
                  <Button variant="ghost" size="sm" className="mr-2">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    {t("back")}
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {t("manageProducts")}
                  </h1>
                  <p className="text-gray-500 mt-1">
                    {t("manageProductsDescription")}
                  </p>
                </div>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                {t("addProduct")}
              </Button>
            </div>
          </header>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {products?.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">{t("noProductsYet")}</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {t("addFirstProduct")}
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("productName")}</TableHead>
                      <TableHead>{t("category")}</TableHead>
                      <TableHead>{t("price")}</TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead className="text-right">
                        {t("actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div>
                            <span>{product.name}</span>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          €{Number(product.price).toFixed(2)}/{product.unit}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.inStock ? "default" : "destructive"
                            }
                          >
                            {product.inStock ? t("inStock") : t("outOfStock")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline">
                              <Pencil className="h-4 w-4 mr-1" />
                              {t("edit")}
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4 mr-1" />
                              {t("delete")}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t("addNewProduct")}</DialogTitle>
          </DialogHeader>
          <ProductForm onSuccess={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t("editProduct")}</DialogTitle>
          </DialogHeader>
          {/* {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          )} */}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
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
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
