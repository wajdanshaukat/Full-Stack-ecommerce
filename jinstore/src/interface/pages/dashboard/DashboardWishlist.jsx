import React, { useEffect, useState } from "react";
import { useWishlist } from "../../../context/WishlistContext";
import ProductCard from "../../components/ProductCard";
import axios from "axios";

const DashboardWishlist = () => {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!wishlist || wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const productIds = wishlist.map((item) => item.id);

        const responses = await Promise.all(
          productIds.map((id) =>
            axios.get(`http://127.0.0.1:8000/products/${id}`)
          )
        );

        const fullProducts = responses.map((res) => res.data);
        setProducts(fullProducts);
      } catch (error) {
        console.error("Failed to fetch wishlist products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  if (loading) return <div className="p-4 text-gray-500">Loading wishlist...</div>;

  return (
    <>
      {/* Header */}
      <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
        Your Wishlist
      </h2>

      {/* Product Grid Section */}
      <div className="border border-gray-300 rounded-xl">
        <div className="grid xs:girdcol-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 divide-x divide-y divide-gray-300 bg-white">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              Your wishlist is empty.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardWishlist;
