import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/cart/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (Array.isArray(res.data)) {
          const normalized = res.data.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }));
          setCartItems(normalized);
          localStorage.setItem("cart", JSON.stringify(normalized));
        }
      } catch (err) {
        console.error("Failed to load cart from backend", err);
      }
    };

    if (token) fetchCart();
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (product) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/cart/",
        { product_id: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const existing = cartItems.find((item) => item.id === product.id);
      if (existing) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("Failed to remove from cart", err);
    }
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getCartCount = () => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return total > 0 ? total : "";
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        setToken,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
