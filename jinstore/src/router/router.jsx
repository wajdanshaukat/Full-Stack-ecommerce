import { Routes, Route } from "react-router-dom";
import Home from "../interface/pages/Home";
import Shop from "../interface/pages/Shop";
import AuthPage from "../interface/pages/AuthPage";
import WishlistPage from "../interface/pages/WishlistPage";
import CartPage from "../interface/pages/CartPage";
import CheckoutPage from "../interface/pages/CheckoutPage";
import Contact from "../interface/pages/Contact";
import Blog from "../interface/pages/Blog";
import CategoryPage from "../interface/pages/CategoryPage";
import MainLayout from "../layouts/MainLayout";
import ScrollToTop from "../interface/components/ScrollToTop";
import CompleteProfilePage from "../interface/pages/CompleteProfilePage";
import ThankYouPage from "../interface/pages/ThankYouPage";
import OrderDetails from "../interface/pages/OrderPage";
import { Toaster } from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
// import AccountDetailsForm from "../interface/pages/dashboard/AccountDetailsForm";
import DashboardOrders from "../interface/pages/dashboard/OrdersInfo";
import DashboardUserInfo from "../interface/pages/dashboard/UserInfoPage";
import EditProfile from "../interface/pages/dashboard/EditProfile";
import DashboardWishlist from "../interface/pages/dashboard/DashboardWishlist";

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />

      <Routes>
        {/* 🏠 Main public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />

          {/* 📦 Vendor dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* <Route index element={<AccountDetailsForm />} /> */}
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="user-info" element={<DashboardUserInfo />} />
            <Route path="wishlist" element={<DashboardWishlist />} />
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
