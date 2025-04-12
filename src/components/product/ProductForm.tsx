import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { Product, insertProductSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();

  // Extend the product schema with validations
  const formSchema = insertProductSchema.extend({
    name: z.string().min(3, { message: t('productNameMin') }),
    description: z.string().min(10, { message: t('productDescriptionMin') }),
    price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: t('productPricePositive'),
    }),
    unit: z.string().min(1, { message: t('productUnitRequired') }),
    category: z.string().min(1, { message: t('productCategoryRequired') }),
  });

  // Initialize form with existing product data or defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? { 
          ...product,
          price: product.price.toString()
        }
      : {
          name: "",
          description: "",
          price: "",
          unit: "kg",
          category: "",
          inStock: true,
          farmerId: user?.id || 0,
          farmerName: user?.name || "",
        },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      // Convert price to number
      const formattedData = {
        ...data,
        price: Number(data.price),
        farmerId: user?.id || 0,
        farmerName: user?.name || "",
      };
      
      const res = await apiRequest("POST", "/api/products", formattedData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/farmer/products'] });
      toast({
        title: t('productAdded'),
        description: t('productAddedSuccess'),
      });
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: t('productAddError'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      // Convert price to number
      const formattedData = {
        ...data,
        price: Number(data.price),
      };
      
      const res = await apiRequest("PUT", `/api/products/${product?.id}`, formattedData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/farmer/products'] });
      toast({
        title: t('productUpdated'),
        description: t('productUpdatedSuccess'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: t('productUpdateError'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (product) {
      updateProductMutation.mutate(values);
    } else {
      createProductMutation.mutate(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('productName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('productNamePlaceholder')} {...field} />
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
              <FormLabel>{t('productDescription')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('productDescriptionPlaceholder')} {...field} />
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
                <FormLabel>{t('productPrice')}</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" type="number" step="0.01" min="0" {...field} />
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
                <FormLabel>{t('productUnit')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectUnit')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">{t('kilogram')}</SelectItem>
                    <SelectItem value="piece">{t('piece')}</SelectItem>
                    <SelectItem value="dozen">{t('dozen')}</SelectItem>
                    <SelectItem value="liter">{t('liter')}</SelectItem>
                    <SelectItem value="bundle">{t('bundle')}</SelectItem>
                    <SelectItem value="jar">{t('jar')}</SelectItem>
                    <SelectItem value="bag">{t('bag')}</SelectItem>
                    <SelectItem value="box">{t('box')}</SelectItem>
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
              <FormLabel>{t('productCategory')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectCategory')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Vegetables">{t('vegetables')}</SelectItem>
                  <SelectItem value="Fruits">{t('fruits')}</SelectItem>
                  <SelectItem value="Dairy">{t('dairy')}</SelectItem>
                  <SelectItem value="Meat">{t('meat')}</SelectItem>
                  <SelectItem value="Poultry">{t('poultry')}</SelectItem>
                  <SelectItem value="Bakery">{t('bakery')}</SelectItem>
                  <SelectItem value="Specialty">{t('specialty')}</SelectItem>
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
                <FormLabel>{t('inStock')}</FormLabel>
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
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={createProductMutation.isPending || updateProductMutation.isPending}
        >
          {product ? t('updateProduct') : t('addProduct')}
        </Button>
      </form>
    </Form>
  );
}
