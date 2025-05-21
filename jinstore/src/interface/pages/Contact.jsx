import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import ServiceHighlights from "../../interface/components/ServiceHighlights";
import Breadcrumbs from "../components/Breadcrumbs";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Breadcrumbs */}
      <div className="absolute left-4 text-sm text-gray-500">
        <Breadcrumbs />
      </div>
      {/* Header */}
      <div className="text-center mb-12 mt-20">
        <p className="text-sm text-gray-500 font-medium">Contact With Us</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
          You can ask us questions
        </h1>
        <p className="mt-4 text-gray-600 text-sm max-w-2xl mx-auto">
          Contact us for all your questions and opinions, or you can solve your
          problems in a shorter time with our contact offices.
        </p>
      </div>

      {/* Divider */}
      <hr className="my-20 border-gray-200" />

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-22">
        {/* Left Side - Offices + Social Icons */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Offices
            </h2>
            <p className="text-sm text-gray-600 mb-10">
              On dekande mydurtad mora även om skurkstat. Semirade timaheten
              rena. Radiogen pasam inte loba även om prerade i garanterad
              traditionell specialitet till bebel. Ev is sönde. Tun gps-väst att
              epiligt. Diliga tresk dira. Ens biov dijevis.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* United States Office */}
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <div>
                    <p className="text-sm text-gray-600">United States</p>
                    <h3 className="text-md font-semibold text-gray-800">
                      United States Office
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  205 Middle Road, 2nd Floor, New York
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  +02 1234 567 88
                </p>
                <p className="text-sm text-blue-600">info@example.com</p>
              </div>

              {/* Munich Office */}
              <div>
                <div className="flex items-start gap-2 mb-1">
                  <div>
                    <p className="text-sm text-gray-600">Munich</p>
                    <h3 className="text-md font-semibold text-gray-800">
                      Munich States Office
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  205 Middle Road, 2nd Floor, New York
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  +5 456 123 22
                </p>
                <p className="text-sm text-blue-600">contact@example.com</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-10 border-gray-200" />

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Follow us:</span>
            <a
              href="#"
              className="w-8 h-8 bg-[#3b5998] text-white rounded flex items-center justify-center"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-[#1da1f2] text-white rounded flex items-center justify-center"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-[#e4405f] text-white rounded flex items-center justify-center"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-[#0077b5] text-white rounded flex items-center justify-center"
            >
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form (unchanged) */}
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your name *
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your email *
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your message
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <ServiceHighlights />
    </div>
  );
};

export default Contact;
