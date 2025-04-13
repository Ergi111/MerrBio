import { useMemo, useState } from "react";
import { ProductGrid } from "./product/ProductGrid";
import { useGetProducts } from "../services/useGetProducts";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const { products } = useGetProducts();

  const handleToggleSort = () => {
    setSort((prevSort) => (prevSort === "asc" ? "desc" : "asc"));
  };

  const handleOnChange = (e: string) => {
    setSearch(e);
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "asc") {
      filtered = filtered.sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    } else {
      filtered = filtered.sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
    }

    return filtered;
  }, [products, search, sort]);

  return (
    <div className="flex-grow py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("allProducts")}
          </h1>
        </div> */}

        <ProductGrid
          sort={sort}
          setSort={handleToggleSort}
          search={search}
          setSearch={handleOnChange}
          products={filteredProducts}
        />
      </div>
    </div>
  );
}
