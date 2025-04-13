import { useLanguage } from "../../context/LanguageContext";
// import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "../../components/NavBar";
// import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest, queryClient } from "@/lib/queryClient";
import { PlusCircle } from "lucide-react";
import { AddProductModal } from "../../components/AddProductModal";
import { DeleteProductModal } from "../../components/product/DeleteProductModal";
import { EditProductModal } from "../../components/product/EditProductModal";
import { useFetchFarmerProducts } from "../../services/useGetFarmerProducts";
import { useAuth } from "../../context/useAuth";
import { NoDataYet } from "../../components/NoDataYet";
import { PageHeader } from "../../components/PageHeader";

export default function FarmerProducts() {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  const { products, loading } = useFetchFarmerProducts(
    currentUser?.id as string
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <PageHeader
              title={t("manageProducts")}
              subTitle={t("manageProductsDescription")}
            />
            <AddProductModal />
          </div>
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {products?.length === 0 ? (
              <NoDataYet
                title={t("noProductsYet")}
                subTitle={t("addProductDescription")}
                icon={<PlusCircle className="h-8 w-8 text-gray-400" />}
              />
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
                            <span>{product.productName}</span>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        {/* <TableCell>
                          €{Number(product.price).toFixed(2)}/{product.unit}
                        </TableCell> */}
                        {/* <TableCell>
                          <Badge
                            variant={
                              product.inStock ? "default" : "destructive"
                            }
                          >
                            {product.inStock ? t("inStock") : t("outOfStock")}
                          </Badge>
                        </TableCell> */}
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <EditProductModal product={product} />
                            <DeleteProductModal productId={product.id} />
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
    </div>
  );
}
