import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const categoryLinks = [
  { name: "Fruits & Vegetables", slug: "fruits" },
  { name: "Beverages", slug: "beverages" },
];

const BottomNav = ({
  menuOpen,
  handleLinkClick,
  isAuthenticated,
  user,
  logout,
  cartCount,
  wishlistCount,
}) => {
  const [trendingOpen, setTrendingOpen] = useState(false);

  const getLinkClasses = ({ isActive }) =>
    `hover:text-blue-600 ${
      isActive ? "text-blue-700 font-semibold underline" : ""
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-4 py-2 text-sm md:text-[12px] text-gray-700 mt-2">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex gap-6 items-center md:font-[8px]">
          <NavLink to="/" className={getLinkClasses}>
            <div className="flex items-center gap-1 cursor-pointer">Home</div>
          </NavLink>

          <NavLink to="/shop" className={getLinkClasses}>
            <div className="flex items-center gap-1 cursor-pointer">Shop</div>
          </NavLink>

          {categoryLinks.map((cat) => (
            <NavLink
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={getLinkClasses}
            >
              {cat.name}
            </NavLink>
          ))}

          <NavLink to="/blog" className={getLinkClasses}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={getLinkClasses}>
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <button
              onClick={() => setTrendingOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              Trending Products <IoIosArrowDown />
            </button>
            {trendingOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border shadow-lg rounded-md min-w-[180px] z-50">
                <Link
                  to="/top-rated"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Top Rated
                </Link>
                <Link
                  to="/most-viewed"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Most Viewed
                </Link>
              </div>
            )}
          </div>

          <button className="flex items-center gap-1 text-red-600 text-xs px-3 py-1 rounded-full font-semibold hover:bg-red-200 transition-all">
            Almost Finished
            <span className="bg-red-500 text-white text-[10px] px-1 py-[1px] ml-1 rounded">
              SALE
            </span>
            <IoIosArrowDown className="ml-1 text-sm" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation (Hamburger Menu) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-sm text-gray-700">
          <Link
            to="/"
            className="block"
            onClick={() => handleLinkClick("Home")}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block"
            onClick={() => handleLinkClick("Shop")}
          >
            Shop
          </Link>

          {categoryLinks.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="block"
              onClick={() => handleLinkClick(cat.name)}
            >
              {cat.name}
            </Link>
          ))}

          <Link
            to="/blog"
            className="block"
            onClick={() => handleLinkClick("Blog")}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="block"
            onClick={() => handleLinkClick("Contact")}
          >
            Contact
          </Link>
          <Link
            to="/top-rated"
            className="block"
            onClick={() => handleLinkClick("Trending")}
          >
            Trending Products
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="block text-blue-700 font-medium"
                onClick={() => handleLinkClick("Dashboard")}
              >
                Hello, {user?.firstName || "User"}
              </Link>
              <button
                onClick={() => {
                  logout();
                  handleLinkClick("Logout");
                }}
                className="block text-red-500 hover:underline"
              >
                Logout
              </button>

              <Link
                to="/wishlist"
                className="block"
                onClick={() => handleLinkClick("Wishlist")}
              >
                Wishlist{" "}
                {wishlistCount > 0 && (
                  <span className="text-red-500">({wishlistCount})</span>
                )}
              </Link>

              <Link
                to="/cart"
                className="block"
                onClick={() => handleLinkClick("Cart")}
              >
                Cart{" "}
                {cartCount > 0 && (
                  <span className="text-yellow-600">({cartCount})</span>
                )}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default BottomNav;
