import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    clearCart();
    clearWishlist();
    navigate("/login");
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  const getLinkClass = ({ isActive }) =>
    `block hover:text-purple-600 ${isActive ? "text-purple-600" : ""}`;

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-6">
        <FaUser className="text-2xl text-gray-600" />
        <div className="text-sm">
          <p className="text-gray-500">Welcome back,</p>
          <p className="font-semibold">{user?.email || "User"}</p>
        </div>
      </div>

      <nav className="text-[15px] text-gray-700 space-y-6">
        <NavLink
          to="user-info"
          className={getLinkClass}
          onClick={() => setSidebarOpen(false)}
        >
          User Info
        </NavLink>
        <NavLink
          to="orders"
          className={getLinkClass}
          onClick={() => setSidebarOpen(false)}
        >
          Orders
        </NavLink>
        <NavLink
          to="wishlist"
          className={getLinkClass}
          onClick={() => setSidebarOpen(false)}
        >
          Wishlist
        </NavLink>
        <button
          onClick={() => {
            handleLogout();
            setSidebarOpen(false);
          }}
          className="flex items-center gap-1 hover:text-purple-600 cursor-pointer"
        >
          <FaSignOutAlt className="text-xs" /> Log out
        </button>
      </nav>
    </>
  );

  return (
    <div className="px-4 py-6">
      <div className="mb-4 flex justify-between items-center">
        <Breadcrumbs />
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-600 text-2xl rounded-md"
          aria-label="Open Filters"
        >
          ☰
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar for large screens */}
        <aside className="hidden lg:block w-[260px] bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <SidebarContent />
        </aside>

        {/* Sidebar drawer for small screens */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed top-0 right-0 w-64 h-full bg-white p-6 shadow-md z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 text-2xl mb-4"
              >
                ✕
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
