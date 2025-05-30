import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "../../interface/components/ProductCard";
import Breadcrumbs from "../../interface/components/Breadcrumbs";
import bannerImage from "../../assets/shopPage_banner.jpg";
import { List, Grid } from "lucide-react";
import FilterSidebar from "../../interface/components/FilterSidebar";
import api from "../../utils/api";

const PRODUCTS_PER_PAGE = 4 * 4;

const Shop = () => {
  const [sort, setSort] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryId = searchParams.get("category_id");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {};
        if (categoryId) params.category_id = categoryId;
        if (sort) params.sort = sort;
        if (minPrice) params.min_price = minPrice;
        if (maxPrice) params.max_price = maxPrice;

        const response = await api.get("/products/", { params });
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, sort, minPrice, maxPrice]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (categoryId) {
        newParams.set("category_id", categoryId);
      } else {
        newParams.delete("category_id");
      }
      return newParams;
    });
  };

  useEffect(() => {
    const savedView = localStorage.getItem("view");
    if (savedView) {
      setGridView(savedView === "grid");
    }
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  const toggleGridView = (view) => {
    setGridView(view);
    localStorage.setItem("view", view ? "grid" : "list");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
      <div className="mb-4 flex justify-between items-center">
        <Breadcrumbs />
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-600 text-2xl rounded-md"
          aria-label="Open Filters"
        >
          ☰
        </button>
      </div>

      <div className="flex gap-4">
        <aside className="w-55 border-gray-200 pr-4 hidden lg:block">
          <FilterSidebar
            selectedCategoryId={categoryId}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        <main className="flex-1">
          <div
            className="w-full h-58 bg-cover bg-center rounded-lg mb-6 flex items-center px-8 text-white"
            style={{
              backgroundImage: `linear-gradient(rgba(123, 123, 123, 0.18), rgba(201, 197, 197, 0.16)),url(${bannerImage})`,
            }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl text-black font-bold mb-2">
                Grocery store with different treasures
              </h2>
              <p className="text-sm text-gray-500">
                We have prepared special discounts for you on grocery
                products...
              </p>
              <button className="mt-3 px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-300">
                Shop Now →
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 bg-gray-200 p-3 rounded-lg">
            <p className="text-sm text-gray-500">
              Showing {products.length} results
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 text-sm px-2 py-1 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sort by: </option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
              <div className="flex items-center gap-1 text-gray-500">
                <button
                  onClick={() => toggleGridView(true)}
                  className={`p-1 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 ${
                    gridView ? "text-blue-500" : ""
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => toggleGridView(false)}
                  className={`p-1 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 ${
                    !gridView ? "text-blue-500" : ""
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl overflow-hidden">
            <div
              className={`grid ${
                gridView
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [@media(min-width:1440px)]:grid-cols-5"
                  : "grid-cols-1"
              } gap-4 p-4 divide-x divide-y divide-gray-300 bg-white`}
            >
              {loading ? (
                <p className="text-center col-span-full text-gray-500">
                  Loading products...
                </p>
              ) : paginatedProducts.length === 0 ? (
                <p className="text-center col-span-full text-red-500">
                  No products found.
                </p>
              ) : (
                paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-1 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded border text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1.5 rounded border text-sm ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded border text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex justify-end"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-64 bg-white p-4 h-full overflow-y-auto relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Filter Products
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 text-2xl"
              >
                ✕
              </button>
            </div>
            <FilterSidebar
              selectedCategoryId={categoryId}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
