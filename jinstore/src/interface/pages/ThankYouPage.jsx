import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import Breadcrumbs from "../components/Breadcrumbs";

const ThankYouPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="p-6">
      <div className="mb-4 text-sm text-gray-500">
        <Breadcrumbs />
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-4 py-12 text-center">
          <FiCheckCircle className="text-green-600" size={80} />
          <h1 className="text-2xl font-semibold text-green-600 mt-4 mb-4">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We’ll email you the details
            shortly.
          </p>

          {/* Button Row */}
          <div className="flex gap-4 py-4">
            <Link
              to="/shop"
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded text-sm transition"
            >
              Continue Shopping
            </Link>
            {orderId && (
              <Link
                to={`/order-details/${orderId}`}
                className="border border-black text-black hover:bg-gray-100 px-6 py-3 rounded text-sm transition"
              >
                View Order Details
              </Link>
            )}
          </div>
        </div>
      </div>
  );
};

export default ThankYouPage;
