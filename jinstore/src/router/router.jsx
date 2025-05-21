import { Routes, Route } from "react-router-dom";
import Home from "../interface/pages/Home";
import Shop from "../interface/pages/Shop";
import AuthPage from "../interface/pages/AuthPage";
import VendorDashboard from "../interface/pages/vendorAdminDash";
import WishlistPage from "../interface/pages/WishlistPage";
import CartPage from "../interface/pages/CartPage";
import CheckoutPage from "../interface/pages/CheckoutPage";
import Contact from "../interface/pages/Contact";
import Blog from "../interface/pages/Blog";
import CategoryPage from "../interface/pages/CategoryPage";
import MainLayout from "../layouts/MainLayout";
import ScrollToTop from "../interface/components/ScrollToTop";
import CompleteProfilePage from "../interface/pages/CompleteProfilePage";
import { Toaster } from "react-hot-toast";


function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
