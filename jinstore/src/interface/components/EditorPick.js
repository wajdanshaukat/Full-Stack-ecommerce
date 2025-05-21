// this products screens has been temporarily removed

import React from "react";
// import editorpick1 from "../..assets/editorpick1.jpeg";
// import editorpick2 from "../..assets/editorpick2.jpeg";
// import editorpick3 from "../..assets/editorpick3.jpeg";
// import editorpick4 from "../..assets/editorpick4.jpeg";
// import editorpick5 from "../..assets/editorpick5.jpeg";
// import editorpick6 from "../..assets/editorpick6.jpeg";

const products = [
  {
    name: "100 Percent Apple Juice",
    image: "/assets/products/apple.png",
    discount: "75%",
    price: "$0.50",
    oldPrice: "$1.99",
    stars: 4,
    isOrganic: true,
    available: 23,
    timeLeft: "87:06:57",
  },
  {
    name: "Great Value Rising Crust Pizza",
    image: "/assets/products/pizza.png",
    discount: "11%",
    price: "$8.99",
    oldPrice: "$9.99",
    stars: 3,
  },
  {
    name: "Simply Orange Pulp Free Juice",
    image: "/assets/products/juice.png",
    discount: "41%",
    price: "$2.45",
    oldPrice: "$4.13",
    stars: 2,
  },
  {
    name: "Cantaloupe Melon Fresh Cut",
    image: "/assets/products/melon.png",
    discount: "50%",
    price: "$1.25",
    oldPrice: "$2.98",
    stars: 3,
  },
  {
    name: "California Pizza Kitchen Thin Crust",
    image: "/assets/products/pizza2.png",
    discount: "21%",
    price: "$11.77",
    oldPrice: "$14.77",
    stars: 4,
  },
  {
    name: "Angel Soft Toilet Paper",
    image: "/assets/products/toilet.png",
    discount: "18%",
    price: "$14.12",
    oldPrice: "$17.12",
    stars: 4,
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-yellow-400 ${i < count ? "opacity-100" : "opacity-30"}`}
      >
        ★
      </span>
    ))}
  </div>
);

const VerticalCard = ({ product }) => (
  <div className="flex flex-col justify-between h-full px-4 py-2">
    <div className="relative mb-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-contain"
      />
      <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
        {product.discount}
      </span>
    </div>
    <div className="space-y-1 text-sm text-gray-800">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-xs text-gray-600">64 fl oz Bottle</p>
      <StarRating count={product.stars} />
      <div className="text-green-600 font-bold">{product.price}</div>
      <div className="text-xs line-through text-gray-400">
        {product.oldPrice}
      </div>
      {product.isOrganic && (
        <span className="inline-block text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">
          ORGANIC
        </span>
      )}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>
          Available: <strong>{product.available}</strong>
        </span>
        <span>⏰ {product.timeLeft}</span>
      </div>
    </div>
    <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-2">
      🛒 Add to Cart
    </button>
  </div>
);

const HorizontalCard = ({ product }) => (
  <div className="flex items-center justify-between w-full px-4 py-2">
    <div className="relative w-20 h-20">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain"
      />
      <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
        {product.discount}
      </span>
    </div>
    <div className="flex-1 pl-4 text-sm text-gray-800 space-y-0.5">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-xs text-gray-500">52 fl oz</p>
      <StarRating count={product.stars} />
      <div className="text-green-600 font-bold">{product.price}</div>
      <div className="text-xs line-through text-gray-400">
        {product.oldPrice}
      </div>
    </div>
    <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg">
      🛒 Add to Cart
    </button>
  </div>
);

const EditorPicksGrid = () => {
  const grouped = [products.slice(0, 3), products.slice(3, 6)];

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Editor's Pick
            </h2>
            <p className="text-sm text-gray-500">
              New products with updated stocks.
            </p>
          </div>
          <button className="text-purple-600 hover:underline text-sm">
            View All →
          </button>
        </div>

        {/* Main Unified Box */}
        <div className="flex flex-col lg:flex-row border border-gray-200 bg-white rounded-lg overflow-hidden">
          {grouped.map((group, idx) => (
            <div
              key={idx}
              className="w-full lg:w-1/2 flex border-gray-200 border-r last:border-none"
            >
              <div className="w-1/3 border-r border-gray-200">
                <VerticalCard product={group[0]} />
              </div>
              <div className="w-2/3 divide-y divide-gray-200">
                <HorizontalCard product={group[1]} />
                <HorizontalCard product={group[2]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorPicksGrid;
