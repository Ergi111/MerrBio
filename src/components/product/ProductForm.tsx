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
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
// import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "../../context/LanguageContext";
import { InsertProduct, productSchema } from "../../schema/schema";

interface ProductFormProps {
  product?: InsertProduct & { inStock?: boolean };
  onSuccess?: () => void;
}

export function ProductForm({ product }: ProductFormProps) {
  const { t } = useLanguage();
  const user = { id: 1, name: "John Doe", role: "farmer" };

  // Extend the product schema with validations
  const formSchema = productSchema.extend({
    name: z.string().min(3, { message: t("productNameMin") }),
    description: z.string().min(10, { message: t("productDescriptionMin") }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("productPricePositive"),
    }),
    unit: z.string().min(1, { message: t("productUnitRequired") }),
    category: z.string().min(1, { message: t("productCategoryRequired") }),
  });

  // Initialize form with existing product data or defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          ...product,
          price: product.price.toString(),
        }
      : {
          name: "",
          description: "",
          price: "",
          unit: "kg",
          category: "",
          inStock: product?.inStock ?? true,
          farmerId: user?.id || 0,
          farmerName: user?.name || "",
        },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("productName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("productNamePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
          <FormField
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
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("productUnit")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectUnit")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">{t("kilogram")}</SelectItem>
                    <SelectItem value="piece">{t("piece")}</SelectItem>
                    <SelectItem value="dozen">{t("dozen")}</SelectItem>
                    <SelectItem value="liter">{t("liter")}</SelectItem>
                    <SelectItem value="bundle">{t("bundle")}</SelectItem>
                    <SelectItem value="jar">{t("jar")}</SelectItem>
                    <SelectItem value="bag">{t("bag")}</SelectItem>
                    <SelectItem value="box">{t("box")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
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

        <FormField
          control={form.control}
          name="inStock"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>{t("inStock")}</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
