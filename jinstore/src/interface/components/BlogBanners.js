import React from "react";
import blogBanner1 from "../../assets/blog-banner1.jpeg";
import blogBanner2 from "../../assets/blog-banner2.jpeg";
import blogBanner3 from "../../assets/blog-banner3.jpeg";

const promoBanners = [
  {
    title: "We provide you the best quality products",
    subtitle: "A healthy choice for everyone.",
    image: blogBanner1,
  },
  {
    title: "We make your grocery shopping more exciting",
    subtitle: "Simple in the morning...",
    image: blogBanner2,
  },
  {
    title: "The one supermarket that saves your money",
    subtitle: "Breakfast made easier for you.",
    image: blogBanner3,
  },
];

const BlogBanners = () => {
  return (
    <section className="px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoBanners.map((banner, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden h-36 md:h-40 bg-center bg-cover"
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-[#eeeeee]/0" />

            {/* Text Content */}
            <div className="absolute inset-0 p-5 flex flex-col justify-center z-10">
              <span className="text-xs font-medium text-red-500 uppercase mb-1">
                Only This Week
              </span>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 leading-snug">
                {banner.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{banner.subtitle}</p>
              <button className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-full w-max">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogBanners;
