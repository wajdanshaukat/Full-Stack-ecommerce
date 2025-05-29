import React from "react";
import HeroImage from "../../assets/Hero-image.jpeg";

const HeroBanner = () => {
  return (
    <section className="w-full bg-[#f7f7f7] py-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Text Content */}
        <div>
          <p className="inline-block bg-green-100 text-green-700 font-semibold px-3 py-1 rounded mb-4 text-sm">
            Weekend Discount
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#39245F] leading-tight">
            Get the best quality <br /> products at the lowest prices
          </h1>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            We have prepared special discounts for you on grocery products. Don’t miss these opportunities…
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button className="bg-[#634C95] hover:bg-[#503b78] text-white px-6 py-2 rounded font-semibold shadow">
              Shop Now
            </button>
            <div>
              <span className="text-red-600 text-xl font-bold">$27.99</span>
              <span className="text-gray-400 line-through ml-2">$56.67</span>
              <p className="text-xs text-gray-500">Don't miss this limited time offer.</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={HeroImage}
            alt="Product Promo"
            className="w-full max-w-md md:max-w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
