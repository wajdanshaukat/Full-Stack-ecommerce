import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Breadcrumbs from "../components/Breadcrumbs";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import AddressForm from "../components/AddressForm";
import { useAuth } from "../../context/AuthContext";
import { validateField } from "../../utils/validation";

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

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(defaultForm);
  const [shippingData, setShippingData] = useState(defaultForm);

  const validateForm = (data) => {
    let tempErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "streetAddress",
      "town",
      "state",
      "zipCode",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) {
        tempErrors[field] = error;
      }
    });

    return tempErrors;
  };

  // ✅ Autofill form if logged in, or restore from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        firstName: user.firstName || "",
        companyName: user.companyName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        country: user.country || "Pakistan",
        streetAddress: user.streetAddress || "",
        apartment: user.apartment || "",
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
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error(
        "Please fill all required fields before creating an account."
      );
      return;
    }

    try {
      await axios.post("http://localhost:8000/auth/register", {
        email: formData.email,
        password: "defaultpassword",
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

      await axios.put(
        "http://localhost:8000/protected/update-profile",
        {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          companyName: formData.companyName,
          country: formData.country,
          streetAddress: formData.streetAddress,
          apartment: formData.apartment,
          town: formData.town,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        country: formData.country,
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        companyName: formData.companyName,
        town: formData.town,
        state: formData.state,
        zipCode: formData.zipCode,
      };

      // Save to localStorage & AuthContext
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      login(userData, token);

      toast.success("Account created & profile saved!");
    } catch (error) {
      console.error(
        "Error creating account:",
        error.response?.data || error.message
      );
      toast.error("Account creation failed.");
    }
  };

  const handleOrderSuccess = (orderId) => {
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/thank-you", { state: { orderId } });
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error("You need to login first.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add products before placing an order."
      );
      return;
    }

    const billingErrors = validateForm(formData);
    const isShippingDifferent =
      formData.differentAddress === true ||
      formData.differentAddress === "true";
    const shippingErrors = isShippingDifferent
      ? validateForm(shippingData)
      : {};

    const combinedErrors = { ...billingErrors, ...shippingErrors };
    setErrors(combinedErrors);

    if (Object.keys(combinedErrors).length > 0) {
      toast.error("Please fill all required fields before placing your order.");
      return;
    }

    const billing = formData;
    const shipping = isShippingDifferent ? shippingData : formData;

    // Map your frontend shippingMethod values to backend enum:
    const shippingMethodMap = {
      "Flat rate": "Standard",
      "Local pickup": "Pickup",
    };

    // Make sure your paymentStatus enum is respected, default to pending
    const paymentStatus = "Pending";

    const payload = {
      user_id: user?.id,
      firstName: billing.firstName,
      lastName: billing.lastName,
      companyName: billing.companyName,
      apartment: billing.apartment,
      email: billing.email,
      phone: billing.phone,
      country: billing.country,
      streetAddress: billing.streetAddress,
      town: billing.town,
      state: billing.state,
      zipCode: billing.zipCode,

      shipping_to_different: isShippingDifferent,
      ...(isShippingDifferent && {
        shipping_first_name: shipping.firstName,
        shipping_last_name: shipping.lastName,
        shipping_company_name: shipping.companyName,
        shipping_phone_number: shipping.phone,
        shipping_address_line_1: shipping.streetAddress,
        shipping_address_line_2: shipping.apartment,
        shipping_country: shipping.country,
        shipping_city: shipping.town,
        shipping_state: shipping.state,
        shipping_zip_code: shipping.zipCode,
      }),

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
      })),
    };
    console.log("Mapped Order Details:", payload);

    try {
      const response = await axios.post(
        "http://localhost:8000/orders/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const orderId = response.data.id;
      handleOrderSuccess(orderId);
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
                errors={errors}
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
                    errors={errors}
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
