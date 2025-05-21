import bannerImage from "../../assets/promo-banner.png";

const FullWidthPromoBanner = () => {
  return (
    <section className="w-full px-4 my-6">
      <div className="max-w-7xl mx-auto relative w-full h-40 md:h-20 rounded-lg overflow-hidden bg-[#FFF5E5] flex items-center justify-between px-6">
      {/* Centered %50 in Background */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <span className="text-[100px] mb-8 md:text-[110px] font-bold text-orange-200 opacity-50 select-none leading-none">
            %50
          </span>
        </div>

        {/* Text Section */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-sm md:text-base font-semibold text-red-600 mb-1">
            In store or online your health & safety is our top priority
          </h2>
          <p className="text-xs md:text-sm text-gray-700">
            The only supermarket that makes your life easier, makes you enjoy
            life and makes it better.
          </p>
        </div>

        {/* Right-side Illustration */}
        <div className="relative z-10 h-100 w-70 flex items-center justify-end">
          <img
            src={bannerImage}
            alt="Promo Illustration"
            className="h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FullWidthPromoBanner;
