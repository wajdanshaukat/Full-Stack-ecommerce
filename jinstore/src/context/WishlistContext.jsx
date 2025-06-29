import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/wishlist/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (Array.isArray(res.data)) {
          const normalized = res.data.map((item) => item.product);
          setWishlist(normalized);
          localStorage.setItem("wishlist", JSON.stringify(normalized));
        }
      } catch (err) {
        console.error("Failed to load wishlist from backend", err);
      }
    };

    if (token) fetchWishlist();
  }, [token]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = async (product) => {
    if (wishlist.find((item) => item.id === product.id)) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/wishlist/",
        { product_id: product.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWishlist((prev) => [...prev, product]);
    } catch (err) {
      console.error("Failed to add to wishlist", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  const isProductInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isProductInWishlist,
        setToken,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
