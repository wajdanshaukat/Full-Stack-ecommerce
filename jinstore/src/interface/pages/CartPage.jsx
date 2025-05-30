import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import Svg from "../../assets/SVG.png";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [fullCartItems, setFullCartItems] = useState([]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (!cartItems.length) {
        setFullCartItems([]);
        return;
      }

      try {
        const responses = await Promise.all(
          cartItems.map((item) =>
            axios.get(`http://127.0.0.1:8000/products/${item.id}`)
          )
        );

        const detailedItems = responses.map((res, index) => ({
          ...res.data,
          quantity: cartItems[index].quantity,
        }));

        setFullCartItems(detailedItems);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartDetails();
  }, [cartItems]);

  const handleQuantityChange = (id, newQty) => {
    const quantity = Math.max(1, newQty);
    updateQuantity(id, quantity);

    setFullCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart ❌`);
  };

  const totalPrice = fullCartItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );

  return (
    <div className="bg-white px-12 py-12 relative">
      {/* Breadcrumbs */}
      <div className="absolute top-4 left-4 text-sm text-gray-500">
        <Breadcrumbs />
      </div>

      <div className="max-w-8xl mx-auto py-8 px-2">
        {fullCartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-16">
            <div className="w-40 h-40 mb-6">
              <img src={Svg} alt="Empty cart" className="w-full h-full object-contain" />
            </div>
          <p className="text-red-600 border border-gray-300 px-4 py-2 rounded text-lg font-medium mb-4">
              Your cart is currently empty
            </p>
            <Link
              to="/shop"
              className="inline-block bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md text-sm"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="grid grid-cols-6 font-semibold border-b pb-3 mb-4 text-gray-700 text-xs">
              <div className="text-center">Product</div>
              <div>Descrip</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Price</div>
              <div className="text-center">Amount</div>
              <div className="text-center">Remove</div>
            </div>

            {/* Cart Items */}
            {fullCartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center border-b text-sm"
              >
                {/* Image */}
                <div className="flex justify-center">
                  <img
                    src={item?.images[0]?.image_path}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>

                {/* Name */}
                <div className="text-gray-800 font-medium text-base text-xs">{item.name}</div>

                {/* Quantity */}
                <div className="flex items-center justify-center gap-2 text-xs">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="text-black hover:text-gray-600 cursor-pointer"
                    disabled={item.quantity <= 1}
                  >
                    ❮
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="text-black hover:text-gray-600 cursor-pointer"
                  >
                    ❯
                  </button>
                </div>

                {/* Price */}
                <div className="text-center font-semibold text-xs">
                  ${item.unit_price.toFixed(2)}
                </div>

                {/* Amount */}
                <div className="text-center font-semibold text-xs">
                  ${(item.unit_price * item.quantity).toFixed(2)}
                </div>

                {/* Remove */}
                <div className="text-center">
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="text-black text-[20px] hover:text-red-500 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            {/* Total & Checkout */}
            <div className="mt-8 flex flex-col items-end">
              <div className="text-md font-semibold mb-4">
                Total: ${totalPrice.toFixed(2)}
              </div>
              <Link
                to="/checkout"
                className="bg-black text-white px-3 py-3 rounded hover:bg-gray-800 text-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
