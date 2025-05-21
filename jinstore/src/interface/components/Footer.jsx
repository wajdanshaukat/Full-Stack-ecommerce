import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import PlayStore from "../../assets/playstore_logo.png";
import AppStore from "../../assets/applestore_logo.png";
import paypal from "../../assets/paypal.png";
import mastercard from "../../assets/mastercard-logo.png";
import visa from "../../assets/visa.png";
import skrill from "../../assets/skrill.png";

const Footer = () => {
  return (
    <footer className="bg-[#f6f6f6] text-[#3d3d3d] text-sm font-normal">
      {/* Newsletter Section */}
      <div className="border-b border-gray-300 py-6 px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-semibold text-base mb-1">
            Join our newsletter for £10 offs
          </p>
          <p className="text-gray-600 text-[11px]">
            Register now to get latest updates on promotions & coupons.
            <br />
            Don’t worry, we not spam!
          </p>
        </div>
        <div className="w-full max-w-sm">
          {/* Email input and button row */}
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-3 py-1.5 border border-gray-300 rounded-md text-xs"
            />
            <button className="bg-[#5c3ecf] text-white px-4 py-1.5 rounded-md text-xs">
              SEND
            </button>
          </div>

          {/* Terms & Policy text below as a separate row */}
          <div className="mt-2 text-[11px] text-gray-500">
            By subscribing, you agree to our{" "}
            <a href="#" className="underline hover:text-gray-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-gray-700">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>

      {/* Footer Main Links */}
      <div className="py-10 px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        {/* Help Section */}
        <div>
          <h4 className="font-semibold mb-3">Do You Need Help ?</h4>
          <p className="text-[12px] text-gray-600 mb-5">
            Autoseligen syr. Nek diarask fröbomba. Nör antipol kynoda nynat.
            Pressa fåmoska.
          </p>
          <p className="text-[12px]">Monday–Friday: 6am–6pm</p>
          <div className="flex items-center gap-2 text-lg font-semibold mb-4">
            <FaPhoneAlt className="text-gray-700" />
            0800 300-353
          </div>
          <p className="text-[12px]">Need help with your order?</p>
          <div className="flex items-center gap-2 text-sm mb-1">
            <FaEnvelope className="text-gray-700 text-[18px]" />
            info@example.com
          </div>
        </div>

        {/* Make Money Section */}
        <div>
          <h4 className="font-semibold mb-3">Make Money with Us</h4>
          <ul className="space-y-2 text-gray-700 text-xs">
            <li>Sell on Grogdn</li>
            <li>Sell Your Services on Grogdn</li>
            <li>Sell on Grogdn Business</li>
            <li>Sell Your App on Grogdn</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Become an Blownee Vendor</li>
          </ul>
        </div>

        {/* Let Us Help You */}
        <div>
          <h4 className="font-semibold mb-3">Let Us Help You</h4>
          <ul className="space-y-2 text-gray-700 text-xs">
            <li>Accessibility Statement</li>
            <li>Your Orders</li>
            <li>Returns & Replacements</li>
            <li>Shipping Rates & Policies</li>
            <li>Refund and Returns Policy</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Cookie Settings</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Get to Know Us */}
        <div>
          <h4 className="font-semibold mb-3">Get to Know Us</h4>
          <ul className="space-y-2 text-gray-700 text-xs">
            <li>Careers for Grogdn</li>
            <li>About Grogdn</li>
            <li>Investor Relations</li>
            <li>Grogdn Devices</li>
            <li>Customer reviews</li>
            <li>Social Responsibility</li>
            <li>Store Locations</li>
          </ul>
        </div>

        {/* App Download */}
        <div>
          <h4 className="font-semibold mb-3">Download our app</h4>
          <div className="space-y-2">
            {/* Google Play Row */}
            <div className="flex items-center gap-2">
              <img src={PlayStore} alt="Google Play" className="w-28" />
              <p className="text-[11px]">Download App Get 20% Discount</p>
            </div>

            {/* App Store Row */}
            <div className="flex items-center gap-2">
              <img src={AppStore} alt="App Store" className="w-28" />
              <p className="text-[11px]">Download App Get 20% Discount</p>
            </div>
          </div>

          {/* Social Icons under download */}
          <div className="flex gap-3 mt-4">
            <FaFacebookF className="text-lg text-gray-700 hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="text-lg text-gray-700 hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="text-lg text-gray-700 hover:text-blue-400 cursor-pointer" />
            <FaYoutube className="text-lg text-gray-700 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}

      <div className="border-t border-gray-300 py-6 px-4 md:px-16 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <div className="flex flex-col items-center lg:items-start">
          <p className="text-center lg:text-left mb-2">
            Copyright 2025 © Jinstore WooCommerce WordPress Theme.
          </p>
          <div className="flex items-center gap-3">
            <img src={visa} alt="Visa" className="h-6" />
            <img src={mastercard} alt="MasterCard" className="h-6" />
            <img src={paypal} alt="PayPal" className="h-6" />
            <img src={skrill} alt="skrill" className="h-6" />
          </div>
        </div>

        {/* Right side: footer links */}
        <div className="flex gap-4 text-center">
          <a href="#" className="hover:text-black">
            Terms and Conditions
          </a>
          <a href="#" className="hover:text-black">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black">
            Order Tracking
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
