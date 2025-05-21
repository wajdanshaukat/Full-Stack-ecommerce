import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.png";
import BottomNav from "./BottomNav";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import CartDropdown from "./CartDropdown";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const [activeLink, setActiveLink] = useState("Home");
  const navigate = useNavigate();


  const cartRef = useRef(null);
  const cartButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  return (
    <header className="w-full font-sans z-50 relative">
      {/* Top Mini Bar */}
      <div className="border-b border-gray-200 text-xs text-gray-600 px-4 lg:px-12 py-2 flex justify-between">
        <div className="hidden md:flex gap-4">
          <Link to="/about">About Us</Link>
          <Link to="/account">My Account</Link>
          <Link to="/wishlist">Wishlist</Link>
          <span>
            We deliver to you every day from{" "}
            <span className="text-orange-600 font-semibold">7:00 to 22:00</span>
          </span>
        </div>
        <div className="flex gap-4 ml-auto">
          <span className="hidden sm:flex items-center">
            English <IoIosArrowDown className="ml-1" />
          </span>
          <span className="hidden sm:flex items-center">
            USD <IoIosArrowDown className="ml-1" />
          </span>
          <Link to="/order-tracking" className="hover:text-blue-600">
            Order Tracking
          </Link>
        </div>
      </div>

      {/* Middle Section */}
      <div className="bg-white px-4 lg:px-12 py-3 flex items-center justify-between relative border-b border-gray-200">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link to="/" onClick={() => handleLinkClick("Home")}>
            <img src={logo} alt="Logo" className="h-10 w-auto cursor-pointer" />
          </Link>
          <div className="hidden lg:flex items-center text-sm text-gray-600 hover:text-black cursor-pointer">
            <IoLocationOutline className="mr-1 text-lg" />
            <span>
              Deliver to <b>all</b>
            </span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="w-full md:w-[70%] relative mx-4">
          <input
            type="text"
            placeholder="Search for products, categories or brands..."
            className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 pr-28 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-full">
            Search
          </button>
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-700 relative z-50">
          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                <FaUser className="text-xl" />
                Hello, User
              </span>
              <button
                className="flex items-center gap-2 hover:text-red-500 cursor-pointer"
                onClick={() => {
                  logout();
                  navigate(0);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaUser className="text-xl" />
              Sign In <br />
              Account
            </Link>
          )}

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative hover:text-red-500">
            <FaHeart className="text-lg" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 cursor-pointer">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon + Dropdown */}
          <div className="relative">
            <button
              ref={cartButtonRef}
              className="relative hover:text-yellow-600 cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <FaShoppingCart className="text-lg" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full px-1">
                  {getCartCount()}
                </span>
              )}
            </button>

            {cartOpen && (
              <div
                ref={cartRef}
                className="absolute right-0 top-full mt-2 w-[300px] z-50"
              >
                <CartDropdown onClose={() => setCartOpen(false)} />
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-xl ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        menuOpen={menuOpen}
        activeLink={activeLink}
        handleLinkClick={handleLinkClick}
      />
    </header>
  );
};

export default Navbar;
