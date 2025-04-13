import { ProductCard } from "./ProductCard";
import { useLanguage } from "../../context/LanguageContext";
import { Product } from "../../types/product";
import { NoDataIcon } from "../../assets/icons/NoDataIcon";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AnimatePresence, motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
  sort: "asc" | "desc";
  setSort: () => void;
  search: string;
  setSearch: (value: string) => void;
}

export function ProductGrid({
  products,
  sort,
  setSort,
  search,
  setSearch,
}: ProductGridProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <Input
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchProducts")}
        />

        <div className="flex gap-4 items-center">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">{t("sortAsc")}</SelectItem>
              <SelectItem value="desc">{t("sortDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Animate presence only for products */}
          {products.length === 0 ? (
            <motion.div
              key="no-products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-12 flex items-center gap-2 flex-col"
            >
              <NoDataIcon />
              <p className="text-lg text-gray-500">{t("noProductsFound")}</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard key={product.id} product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
