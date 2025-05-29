import React from "react";
import bestseller1 from "../../assets/bestseller1.jpeg";
import bestseller2 from "../../assets/bestseller2.jpeg";
import bestseller3 from "../../assets/bestseller3.jpeg";
import bestseller4 from "../../assets/bestseller4.jpeg";
import bestseller5 from "../../assets/bestseller5.jpeg";
import bestseller6 from "../../assets/bestseller6.jpeg";
import bestseller7 from "../../assets/bestseller7.jpeg";
import bestseller8 from "../../assets/bestseller8.jpeg"; 
import bestseller9 from "../../assets/bestseller9.jpeg";

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
    description:
      "Vivamus adipiscing nisl ut.",
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
  {
    name: "Strawberry Milk",
    price: "$1.99",
    original: "$2.49",
    discount: "-20%",
    available: 21,
    description: "Delicious and creamy.",
    image: bestseller8,
  },
  {
    name: "Energy Drink",
    price: "$3.49",
    original: "$4.49",
    discount: "-22%",
    available: 30,
    description: "Boost your energy.",
    image: bestseller9,
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
    <section className="px-4 bg-white py-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Best Sellers
            </h2>
            <p className="text-sm text-gray-500">
              Don’t miss this opportunity.
            </p>
          </div>
          <button className="text-sm text-gray-700 hover:text-black font-medium flex items-center gap-1">
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

          {/* Center Column */}
          <div className="flex flex-col gap-3">
            {bestSellerProducts.slice(3, 6).map((product, idx) => (
              <ProductFullCard key={idx + 3} product={product} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {bestSellerProducts.slice(6, 9).map((product, idx) => (
              <ProductFullCard key={idx + 6} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
