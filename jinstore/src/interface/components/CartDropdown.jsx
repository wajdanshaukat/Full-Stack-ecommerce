import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";

const CartDropdown = ({ onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const [fullCartItems, setFullCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (!cartItems || cartItems.length === 0) {
        setFullCartItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);

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
        setFullCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, [cartItems]);

  const handleRemoveFromCart = (productId, productName) => {
    removeFromCart(productId);
    toast.success(`${productName} has been removed from your cart ❌`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 max-h-80 overflow-y-auto w-full">
      {loading ? (
        <div className="text-sm text-gray-500">Loading cart...</div>
      ) : fullCartItems.length === 0 ? (
        <div className="text-sm text-gray-700 mb-4">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-4">
          {fullCartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item?.images[0]?.image_path}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id, item.name)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Link
          to="/cart"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
          onClick={onClose}
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
