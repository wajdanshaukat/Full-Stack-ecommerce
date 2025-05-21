import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Breadcrumbs from "../components/Breadcrumbs";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import AddressForm from "../components/AddressForm";
import { useAuth } from "../../context/AuthContext";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  const defaultForm = {
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Pakistan",
    streetAddress: "",
    apartment: "",
    town: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    createAccount: false,
    differentAddress: false,
    orderNotes: "",
    paymentMethod: "Direct Bank Transfer",
  };

  const [formData, setFormData] = useState(defaultForm);
  const [shippingData, setShippingData] = useState(defaultForm);

  // ✅ Autofill form if logged in, or restore from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        phone: user.phone || "",
        country: user.country || "Pakistan",
        streetAddress: user.street_address || "",
        town: user.town || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
      }));
    } else {
      const savedForm = localStorage.getItem("checkoutForm");
      if (savedForm) {
        setFormData(JSON.parse(savedForm));
      }
    }
  }, [isAuthenticated, user]);

  // 🔄 Save form on change (optional but useful for guest users)
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("checkoutForm", JSON.stringify(formData));
    }
  }, [formData, isAuthenticated]);

  const handleInputChange = (e, isShipping = false) => {
    const { name, value, type, checked } = e.target;
    const setter = isShipping ? setShippingData : setFormData;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateAccount = async () => {
    if (!formData.email) {
      toast.error("Email is required to create an account.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/auth/register", {
        email: formData.email,
        password: "defaultpassword",
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        country: formData.country,
        street_address: formData.streetAddress,
        town: formData.town,
        state: formData.state,
        zipCode: formData.zipCode,
        user_type: "customer",
      });
      

      const loginRes = await axios.post(
        "http://localhost:8000/auth/login/",
        new URLSearchParams({
          username: formData.email,
          password: "defaultpassword",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = loginRes.data.access_token;

      const userData = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        country: formData.country,
        street_address: formData.streetAddress,
        town: formData.town,
        state: formData.state,
        zipCode: formData.zipCode,
      };

      // Save to localStorage & AuthContext
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      login(userData, token);

      toast.success("Account created & logged in successfully!");
    } catch (error) {
      console.error("Registration/Login error:", error);
      toast.error("Failed to create account.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error("You need to login first.");
      return;
    }

    const billing = formData;
    const shipping = formData.differentAddress ? shippingData : formData;

    // Map your frontend shippingMethod values to backend enum:
    const shippingMethodMap = {
      "Flat rate": "Standard", // map your "Flat rate" to "Standard"
      "Local pickup": "Pickup",
    };

    // Make sure your paymentStatus enum is respected, default to pending
    const paymentStatus = "Pending"; // or dynamically set if you implement payment flow

    const payload = {
      user_id: user?.id, // assuming your user context has id
      billing_first_name: billing.firstName,
      billing_last_name: billing.lastName,
      billing_email: billing.email,
      billing_phone: billing.phone,
      billing_country: billing.country,
      billing_address: billing.streetAddress,
      billing_city: billing.town,
      billing_state: billing.state,
      billing_zip: billing.zipCode,

      shipping_to_different: formData.differentAddress,

      shipping_first_name: shipping.firstName,
      shipping_last_name: shipping.lastName,
      shipping_country: shipping.country,
      shipping_address: shipping.streetAddress,
      shipping_city: shipping.town,
      shipping_state: shipping.state,
      shipping_zip: shipping.zipCode,

      shipping_method: shippingMethodMap[billing.shippingMethod] || "Standard",
      payment_method: formData.paymentMethod,
      payment_status: paymentStatus,

      total_amount: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),

      order_details: cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        unit_price: item.unit_price,
        quantity: item.quantity,
      }))
    };
    console.log("Cart Items:", cartItems);
    console.log("Mapped Order Details:", payload);
      

    try {
      await axios.post("http://localhost:8000/orders/", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="bg-white">
      <Toaster position="top-right" />
      <div className="absolute left-4 text-sm text-gray-500 py-4">
        <Breadcrumbs />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="w-full p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-8">Billing details</h2>
            <form className="space-y-6">
              <AddressForm
                data={formData}
                handleChange={handleInputChange}
                disabledEmail={isAuthenticated}
              />

              <div className="space-y-4">
                {!isAuthenticated && (
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="createAccount"
                      checked={formData.createAccount}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Create an account?
                  </label>
                )}

                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="differentAddress"
                    checked={formData.differentAddress}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Ship to a different address?
                </label>
              </div>

              {formData.createAccount && !isAuthenticated && (
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-700"
                >
                  Create Account
                </button>
              )}
            </form>

            {formData.differentAddress && (
              <div className="mt-10 border-t pt-10">
                <h2 className="text-2xl font-semibold mb-8">
                  Shipping details
                </h2>
                <form className="space-y-6">
                  <AddressForm
                    data={shippingData}
                    handleChange={handleInputChange}
                    isShipping
                  />
                </form>
              </div>
            )}
          </div>

          <div className="min-h-0 mt-12">
            <OrderSummary
              cartItems={cartItems}
              formData={formData}
              handleInputChange={handleInputChange}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
