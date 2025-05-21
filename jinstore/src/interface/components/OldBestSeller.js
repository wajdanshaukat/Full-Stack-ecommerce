import React from "react";
import bestseller1 from "../../assets/bestseller1.jpeg";
import bestseller2 from "../../assets/bestseller2.jpeg";
import bestseller3 from "../../assets/bestseller3.jpeg";
import bestseller4 from "../../assets/bestseller4.jpeg";
import bestseller5 from "../../assets/bestseller5.jpeg";
import bestseller6 from "../../assets/bestseller6.jpeg";
import bestseller7 from "../../assets/bestseller7.jpeg";

const bestSellerProducts = [
  {
    name: "Apple Juice",
    price: "$0.50",
    original: "$0.89",
    discount: "-40%",
    available: 26,
    description: "Refreshing apple drink.",
    image: bestseller1,
  },
  {
    name: "Orange Juice",
    price: "$2.45",
    original: "$2.89",
    discount: "-15%",
    available: 42,
    description: "Fresh orange citrus.",
    image: bestseller2,
  },
  {
    name: "Vitamin Water",
    price: "$4.99",
    original: "$6.00",
    discount: "-20%",
    available: 33,
    description: "Hydrate and energize.",
    image: bestseller3,
  },
  {
    name: "Grapefruit Paloma",
    price: "$6.99",
    original: "$9.99",
    discount: "-30%",
    available: 38,
    description: "Vivamus adipiscing nisl ut dolor dignissim semper.Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.",
    highlight: true,
    image: bestseller4,
  },
  {
    name: "Protein Shake",
    price: "$14.99",
    original: "$17.00",
    discount: "-12%",
    available: 17,
    description: "Post-workout nutrition.",
    image: bestseller5,
  },
  {
    name: "Grapefruit Paloma",
    price: "$6.99",
    original: "$9.99",
    discount: "-30%",
    available: 9,
    description: "Refreshing tropical hit.",
    image: bestseller6,
  },
  {
    name: "Vitamin Water Zero",
    price: "$4.99",
    original: "$6.00",
    discount: "-20%",
    available: 29,
    description: "Zero sugar, full taste.",
    image: bestseller7,
  },
];

const ProductFullCard = ({ product }) => (
  <div className="bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-md transition h-full flex flex-col justify-between bg-white">
    <div className="flex items-start gap-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-white rounded"
      />
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800 leading-tight">
          {product.name}
        </h4>
        <p className="text-red-500 font-bold text-sm mt-1">
          {product.price}
          <span className="text-gray-400 line-through ml-1">
            {product.original}
          </span>
        </p>
        <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full inline-block mt-1">
          {product.discount}
        </span>
        <p className="text-xs text-gray-500 mt-1">{product.description}</p>
      </div>
    </div>
    <div className="mt-3">
      <div className="text-xs mb-1">
        Available Qty: <strong>{product.available}</strong>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full mb-2">
        <div
          className="bg-red-400 h-1.5 rounded-full"
          style={{ width: `${Math.min(100, product.available * 2)}%` }}
        ></div>
      </div>
      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full w-full text-xs">
        Add to Cart
      </button>
    </div>
  </div>
);

const BestSellersSection = () => {
  return (
    <section className=" px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header and View All */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Best Sellers
            </h2>
            <p className="text-sm text-gray-500">
              Don’t miss this opportunity at a special discount just for this
              week.
            </p>
          </div>
          <button className="text-sm text-blue-600 hover:underline font-medium">
            View All
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start mb-10">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {bestSellerProducts.slice(0, 3).map((product, idx) => (
              <ProductFullCard key={idx} product={product} />
            ))}
          </div>

          {/* Center Card */}
          <div className="border border-red-200 rounded-xl p-5 shadow bg-white flex flex-col justify-between h-full">
            <div>
              <div className="text-xs text-yellow-500 mb-2">★ ★ ★ ★ ☆</div>
              <img
                src={bestSellerProducts[3].image}
                alt={bestSellerProducts[3].name}
                className="w-full h-52 object-contain mb-4"
              />
              <h3 className="text-base font-semibold text-gray-800">
                {bestSellerProducts[3].name}
              </h3>
              <p className="text-red-600 text-xl font-bold mt-2">
                {bestSellerProducts[3].price}
                <span className="line-through text-sm text-gray-400 ml-2">
                  {bestSellerProducts[3].original}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {bestSellerProducts[3].description}
              </p>
              <div className="mt-4">
                <div className="text-xs mb-1">
                  Available Qty:{" "}
                  <strong>{bestSellerProducts[3].available}</strong>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="bg-red-500 h-2 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full w-full">
              Add to Cart
            </button>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {bestSellerProducts.slice(4, 7).map((product, idx) => (
              <ProductFullCard key={idx} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
