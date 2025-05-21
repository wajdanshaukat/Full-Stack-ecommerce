import React from "react";
import HeroImage from "../../assets/Hero-image.jpeg";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
      {/* Background Image */}
      <img
        src={HeroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-start px-6 sm:px-10 bg-black/20">
        <div className="max-w-xl text-white">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug text-[#39245F]">
            Shopping with us for better quality and the best price
          </h1>
          <p className="mt-2 text-sm md:text-base text-black">
            Special discounts on grocery products. Don’t miss out...
          </p>
          <button className="mt-4 bg-[#634C95] hover:bg-[#503b78] px-5 py-2 rounded font-medium text-white shadow">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
