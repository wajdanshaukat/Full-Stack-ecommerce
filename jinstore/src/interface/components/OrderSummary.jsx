import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSummary = ({
  cartItems,
  formData,
  handleInputChange,
  onPlaceOrder,
}) => {
  const flatRate = 15;
  const [shippingFee, setShippingFee] = useState(flatRate);

  useEffect(() => {
    if (!formData.shippingMethod) {
      handleInputChange({
        target: { name: "shippingMethod", value: "Flat rate" },
      });
      setShippingFee(flatRate);
    }
  }, []);

  // Update shipping fee when shippingMethod changes
  useEffect(() => {
    if (formData.shippingMethod === "Flat rate") {
      setShippingFee(flatRate);
    } else {
      setShippingFee(0);
    }
  }, [formData.shippingMethod]);

  const subtotal = cartItems?.length
    ? cartItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
    : 0;

  const total = (subtotal + shippingFee).toFixed(2);

  const handlePlaceOrder = () => {
    toast.promise(onPlaceOrder(), {
      loading: "Placing your order...",
      error: "Failed to place order. Please try again.",
    });
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 w-full max-w-[500px] mx-auto lg:ml-auto">
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">Your order</h2>

      <div className="text-sm text-gray-700 mb-6 space-y-3">
        {cartItems?.length ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="font-medium">
                {item.name} (qty: {item.quantity} × ${item.unit_price})
              </span>
              <span className="font-semibold ml-auto">
                ${(item.unit_price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">Your cart is empty</div>
        )}

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium pt-1">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="border-b pb-2">
          <div className="flex justify-between items-start">
            <span className="font-medium pt-1">Shipping</span>
            <div className="flex flex-col items-end text-left space-y-1 ml-auto">
              <label className="flex items-center cursor-pointer space-x-2">
                <span>Flat rate: $15.00</span>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="Flat rate"
                  checked={formData.shippingMethod === "Flat rate"}
                  onChange={handleInputChange}
                />
              </label>
              <label className="flex items-center cursor-pointer space-x-2">
                <span>Local pickup</span>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="Local pickup"
                  checked={formData.shippingMethod === "Local pickup"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <div className="mb-6 space-y-4 text-sm text-gray-700">
        <div>
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Direct Bank Transfer"
              checked={formData.paymentMethod === "Direct Bank Transfer"}
              onChange={handleInputChange}
              className="mt-1"
            />
            <div>
              <span className="font-medium">Direct Bank Transfer</span>
              <p className="mt-1 text-gray-600 text-sm">
                Make your payment directly into our bank account. Use your Order
                ID as the payment reference.
              </p>
            </div>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Check Payments"
              checked={formData.paymentMethod === "Check Payments"}
              onChange={handleInputChange}
              className="mt-1"
            />
            <span>Check Payments</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash On Delivery"
              checked={formData.paymentMethod === "Cash On Delivery"}
              onChange={handleInputChange}
              className="mt-1"
            />
            <span>Cash On Delivery</span>
          </label>
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-4">
        Your personal data will be used to process your order and support your
        experience throughout this website. See our{" "}
        <Link to="/privacy" className="text-purple-600 underline">
          privacy policy
        </Link>
        .
      </p>

      <div className="flex items-start text-sm text-gray-700 mb-6">
        <input type="checkbox" required className="mt-1 mr-2" />
        <span>
          I have read and agree to the{" "}
          <Link to="/terms" className="text-purple-600 underline">
            terms and conditions
          </Link>
          .
        </span>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-3 rounded-md transition-all cursor-pointer duration-200"
      >
        Place order
      </button>
    </div>
  );
};

export default OrderSummary;
