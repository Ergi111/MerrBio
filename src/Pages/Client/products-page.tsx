import { useState } from "react";
// import { useLanguage } from "../../context/LanguageContext";
// import { ProductFilter } from "../../components/product/ProductFilter";
import { ProductGrid } from "../../components/product/ProductGrid";
import { Navbar } from "../../components/NavBar";

export default function ProductsPage() {
  // const { t } = useLanguage();
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const currentProducts = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      price: 10.0,
      unit: "kg",
      category: "Fruits",
      inStock: true,
      farmerId: 1,
      farmerName: "Farmer A",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      price: 20.0,
      unit: "kg",
      category: "Vegetables",
      inStock: true,
      farmerId: 2,
      farmerName: "Farmer B",
    },
  ];

  // const productsPerPage = 8;

  // Filter and sort products based on criteria
  // const filteredProducts = allProducts
  //   ?.filter(product => {
  //     // Apply search filter
  //     const matchesSearch = searchTerm
  //       ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         product.description.toLowerCase().includes(searchTerm.toLowerCase())
  //       : true;

  // Apply category filter
  // const matchesCategory = selectedCategory
  //     ? product.category === selectedCategory
  //     : true;

  //   return matchesSearch && matchesCategory;
  // })
  // .sort((a, b) => {
  //   // Apply sorting
  //   switch (sortBy) {
  //     case "price_low":
  //       return Number(a.price) - Number(b.price);
  //     case "price_high":
  //       return Number(b.price) - Number(a.price);
  //     case "name_asc":
  //       return a.name.localeCompare(b.name);
  //     case "name_desc":
  //       return b.name.localeCompare(a.name);
  //     case "latest":
  //     default:
  //       // Sort by created date (newest first) or ID if date not available
  //       if (a.createdAt && b.createdAt) {
  //         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  //       }
  //       return b.id - a.id;
  //   }
  // }) || [];

  // Pagination
  // const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  // const currentProducts = filteredProducts.slice(
  //   (currentPage - 1) * productsPerPage,
  //   currentPage * productsPerPage
  // );

  // Handle filter and pagination changes
  // const handleSearch = (term: string) => {
  //   setSearchTerm(term);
  //   setCurrentPage(1); // Reset to first page
  // };

  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category);
  //   setCurrentPage(1); // Reset to first page
  // };

  // const handleSortChange = (sort: string) => {
  //   setSortBy(sort);
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          /> */}
          <ProductGrid
            products={currentProducts.map((product) => ({
              ...product,
              price: product.price.toString(),
            }))}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
