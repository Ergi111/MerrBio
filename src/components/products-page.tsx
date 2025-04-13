import { useState } from "react";
import { ProductGrid } from "./product/ProductGrid";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-grow py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {/* {t("allProducts")} */}
          </h1>
          {/* <p className="text-gray-500">
              {filteredProducts.length} {t("productsFound")}
            </p> */}
        </div>

        {/* <ProductFilter
          onSearch={() => {}}
          onCategoryChange={() => {}}
          onSortChange={() => {}}
        /> */}
        <ProductGrid
          products={[]}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
