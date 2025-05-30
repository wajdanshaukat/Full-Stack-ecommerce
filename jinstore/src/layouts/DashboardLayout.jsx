import React from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Breadcrumbs from "../interface/components/Breadcrumbs";

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart();
    clearWishlist();
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) =>
    `block hover:text-purple-600 ${isActive ? "text-purple-600" : ""}`;

  return (
    <div className="px-6 py-10">
      <div className="mb-4 text-sm text-gray-500">
        <Breadcrumbs />
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-[260px] bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-2xl text-gray-600" />
            <div className="text-sm">
              <p className="text-gray-500">Welcome back,</p>
              <p className="font-semibold">{user?.email || "User"}</p>
            </div>
          </div>

          <nav className="text-[15px] text-gray-700 space-y-6">
            <NavLink to="user-info" className={getLinkClass}>
              User Info
            </NavLink>
            <NavLink to="orders" className={getLinkClass}>
              Orders
            </NavLink>
            <NavLink to="wishlist" className={getLinkClass}>
              Wishlist
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-purple-600 cursor-pointer"
            >
              <FaSignOutAlt className="text-xs" /> Log out
            </button>
          </nav>
        </aside>

        {/* Main content renders here */}
        <main className="flex-1 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
