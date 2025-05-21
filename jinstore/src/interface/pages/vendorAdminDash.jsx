import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaExchangeAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-[250px] border border-gray-200 rounded-md p-5 bg-white shadow-sm fixed md:relative z-10`}
      >
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar Content */}
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <FaUser className="text-xl text-gray-600" />
            <div className="text-sm">
              <p className="text-gray-500">Welcome back,</p>
              <p className="font-semibold">name@gmail.com</p>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-3 text-sm text-gray-700 font-medium">
            <Link to="/dashboard" className="block hover:text-purple-600">Dashboard</Link>
            <Link to="/orders" className="block hover:text-purple-600">Orders</Link>
            <Link to="/downloads" className="block hover:text-purple-600">Downloads</Link>
            <Link to="/addresses" className="block hover:text-purple-600">Addresses</Link>
            <Link to="/account-details" className="block hover:text-purple-600">Account details</Link>
            <Link to="/wishlist" className="block hover:text-purple-600">Wishlist</Link>
            <Link to="/compare" className="flex items-center gap-1 hover:text-purple-600">
              <FaExchangeAlt className="text-xs" /> Compare
            </Link>
            <Link to="/logout" className="flex items-center gap-1 hover:text-purple-600">
              <FaSignOutAlt className="text-xs" /> Log out
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-5 md:px-10 py-8 mt-16 md:mt-0">
        <h2 className="text-xl font-semibold mb-6">Update account to Vendor</h2>
        <form className="max-w-xl space-y-5">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value="alexwando4224@gmail.com"
              readOnly
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            />
            <p className="text-xs mt-1 text-gray-500">
              https://themee.com/signup/store/
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" required />
            <label className="text-sm text-gray-700">
              I have read and agree to the{" "}
              <a href="#" className="text-blue-600 underline">Terms & Conditions</a>.
            </label>
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-black cursor-pointer"
          >
            Become a Vendor
          </button>
        </form>
      </main>
    </div>
  );
};

export default VendorDashboard
