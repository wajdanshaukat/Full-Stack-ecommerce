import { useNavigate } from "react-router-dom";
import HeroImage from "../../assets/Hero-image.jpeg";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[500px] bg-[#f7f7f7] overflow-hidden px-6 sm:px-10 py-16">
      {/* Background Image on Right */}
      <div className="absolute inset-0">
        <img
          src={HeroImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-right md:object-center"
        />
        {/* Mobile overlay only */}
        <div className="absolute inset-0 bg-[#f7f7f7]/80 md:hidden"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-2xl text-[#39245F]">
        <p className="inline-block bg-green-100 text-green-700 font-semibold px-3 py-1 rounded mb-4 text-sm">
          Weekend Discount
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Get the best quality <br />
          products at the lowest <br />
          prices
        </h1>
        <p className="mt-4 text-black text-sm md:text-base">
          We have prepared special discounts for you <br />
          on grocery products. Don’t miss these opportunities…
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#634C95] hover:bg-[#503b78] text-white px-6 py-2 rounded font-semibold shadow"
          >
            Shop Now
          </button>
          <div>
            <span className="text-red-600 text-xl font-bold">$27.99</span>
            <span className="text-black line-through ml-2">$56.67</span>
            <p className="text-xs text-gray-500">Don't miss this limited time offer.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
