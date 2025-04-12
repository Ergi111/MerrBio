import { ProductCard } from "./ProductCard";
import { useLanguage } from "../../context/LanguageContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { InsertProduct } from "../../schema/schema";

interface ProductGridProps {
  products: InsertProduct[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductGrid({
  products,
  currentPage,
  totalPages,
  onPageChange,
}: ProductGridProps) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-gray-500 text-lg">{t("noProductsFound")}</p>
      </div>
    );
  }

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
            size={undefined}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis at the start if needed
    if (startPage > 1) {
      items.unshift(
        <PaginationItem key="start-ellipsis">
          <PaginationLink size={undefined}>...</PaginationLink>
        </PaginationItem>
      );

      // Add first page
      items.unshift(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => onPageChange(1)}
            size={undefined}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis at the end if needed
    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationLink size={undefined}>...</PaginationLink>
        </PaginationItem>
      );

      // Add last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            size={undefined}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                isActive={currentPage !== 1}
                className={
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }
                size={undefined}
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage !== totalPages) {
                    onPageChange(Math.min(totalPages, currentPage + 1));
                  }
                }}
                className={
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
                size={undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
