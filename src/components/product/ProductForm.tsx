import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
// import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "../../context/LanguageContext";
import { productSchema } from "../../schema/schema";
import { useCreateProduct } from "../../services/useCreateProduct";
import { useAuth } from "../../context/useAuth";
import { FormInput } from "../form/FormInput";
import { Product } from "../../types/product";
import { toast } from "sonner";
import { useUpdateProduct } from "../../services/useUpdateProduct";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const { t } = useLanguage();
  const { createProduct, loading: isCreateLoading } = useCreateProduct();
  const { editProduct, loading: isEditLoading } = useUpdateProduct();
  const { currentUser } = useAuth();
  // Extend the product schema with validations
  const formSchema = z.object({
    productName: z.string().min(3, { message: t("productNameMin") }),
    description: z.string().min(10, { message: t("productDescriptionMin") }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("productPricePositive"),
    }),
    // unit: z.string().min(1, { message: t("productUnitRequired") }),
    category: z.string().min(1, { message: t("productCategoryRequired") }),
  });

  // Initialize form with existing product data or defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product?.productName || "",
      description: product?.description || "",
      price: product?.price ? product.price.toString() : "",
      // unit: product?.unit || "",
      category: product?.category || "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const productData = {
      productName: data.productName,
      description: data.description,
      price: parseFloat(data.price),
      // unit: data.unit,
      category: data.category,
      farmerId: currentUser?.id || "",
      farmerName: currentUser?.fullName || "",
    };

    if (product) {
      console.log("Editing product", product);

      editProduct({
        productId: product.id,
        updatedData: {
          ...productData,
        },
      }).then(() => {
        onSuccess();
      });
      return;
    } else {
      createProduct({
        ...productData,
      }).then(() => {
        toast.success("Product created successfully");
        onSuccess();
      });
    }
  };
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="productName"
          label={t("productName")}
          placeholder={t("productNamePlaceholder")}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("productDescription")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("productDescriptionPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("productPrice")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormInput
            name="price"
            label={t("productPrice")}
            placeholder={t("productPricePlaceholder")}
            type="number"
            step="0.01"
            min="0"
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("productCategory")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCategory")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Vegetables">{t("vegetables")}</SelectItem>
                  <SelectItem value="Fruits">{t("fruits")}</SelectItem>
                  <SelectItem value="Dairy">{t("dairy")}</SelectItem>
                  <SelectItem value="Meat">{t("meat")}</SelectItem>
                  <SelectItem value="Poultry">{t("poultry")}</SelectItem>
                  <SelectItem value="Bakery">{t("bakery")}</SelectItem>
                  <SelectItem value="Specialty">{t("specialty")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {product ? t("updateProduct") : t("addProduct")}
        </Button>
      </form>
    </Form>
  );
}
