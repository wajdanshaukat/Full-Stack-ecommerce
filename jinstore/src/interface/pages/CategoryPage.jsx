import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const categoryMap = {
  fruits: { id: 1, name: "Fruits & Vegetables" },
  beverages: { id: 3, name: "Beverages" },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const category = categoryMap[slug];

      if (!category) {
        console.warn("No matching category for slug:", slug);
        setCategoryName("Unknown");
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setCategoryName(category.name);

        const res = await axios.get(
          `http://127.0.0.1:8000/products?category_id=${category.id}`
        );

        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Banner Section */}
      <div>
        <h2 className="text-2xl md:text-3xl text-black font-bold mb-4 ">
          {categoryName} Products
        </h2>
      </div>

      {/* Products Section */}
      <div className="border border-gray-300 rounded-xl overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 divide-x divide-y divide-gray-300 bg-white">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No products found in this category.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
