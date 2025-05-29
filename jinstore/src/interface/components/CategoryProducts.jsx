// import categoryProduct_banner1 from "../../assets/categoryProduct_banner1.jpeg";
// import categoryProduct_banner2 from "../../assets/categoryProduct_banner2.jpeg";

import categoryProduct1 from "../../assets/categoryProduct1.jpeg";
import categoryProduct2 from "../../assets/categoryProduct2.jpeg";
import categoryProduct3 from "../../assets/categoryProduct3.jpeg";
import categoryProduct4 from "../../assets/categoryProduct4.jpeg";
import categoryProduct5 from "../../assets/categoryProduct5.jpeg";
import categoryProduct6 from "../../assets/categoryProduct6.jpeg";


//this products screens has been temporarily removed
// const promoBanners = [
//   {
//     title: "Make your grocery shopping easy with us",
//     subtitle: "Shop from top deals",
//     image: categoryProduct_banner1,
//   },
//   {
//     title: "Get your everyday needs here with us",
//     subtitle: "A handpicked food grocery store",
//     image: categoryProduct_banner2,
//   },
// ];

const categoryProducts = [
  {
    name: "Great Value Rising Crust Pizza",
    price: "$12.99",
    originalPrice: "$15.00",
    discount: "-15%",
    tag: "BEST FOR YOU",
    image: categoryProduct1,
  },
  {
    name: "Simple Kitchen Deli Sliced Meat",
    price: "$21.00",
    originalPrice: "$24.99",
    discount: "-20%",
    tag: "BEST FOR YOU",
    image: categoryProduct2,
  },
  {
    name: "Red Baron French Bread Pizza",
    price: "$14.99",
    originalPrice: "$17.99",
    discount: "-10%",
    tag: "BEST FOR YOU",
    image: categoryProduct3,
  },
  {
    name: "Great Value Rising Crust Pizza",
    price: "$12.99",
    originalPrice: "$15.00",
    discount: "-15%",
    tag: "BEST FOR YOU",
    image: categoryProduct4,
  },
  {
    name: "Simple Kitchen Deli Sliced Meat",
    price: "$21.00",
    originalPrice: "$24.99",
    discount: "-20%",
    tag: "BEST FOR YOU",
    image: categoryProduct5,
  },
  {
    name: "Red Baron French Bread Pizza",
    price: "$14.99",
    originalPrice: "$17.99",
    discount: "-10%",
    tag: "BEST FOR YOU",
    image: categoryProduct6,
  },
];

const CategoryProductsSection = () => {
  return (
    <section className="px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
            Just For You
            </h2>
            <p className="text-sm text-gray-500">
              Don’t miss the current offers.
            </p>
          </div>
          <button className="text-sm text-gray-700 hover:text-black font-medium flex items-center gap-1">
            View All
          </button>
        </div>


        {/* Promo Banners */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {promoBanners.map((banner, index) => (
            <div
            key={index}
            className="relative rounded-xl overflow-hidden h-52 md:h-60 bg-center bg-cover"
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            <div className="absolute inset-0 bg-[#eeeeee]/" />
          
            <div className="absolute inset-0 p-6 flex flex-col justify-center z-10">
              <span className="text-xs font-medium text-red-500 uppercase mb-1">
                Only This Week
              </span>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                {banner.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{banner.subtitle}</p>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full w-max">
                Shop Now
              </button>
            </div>
          </div>
          ))}
        </div> */}

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categoryProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow hover:shadow-md transition-all relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {product.discount}
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-contain mb-3"
              />

              <h3 className="text-sm font-semibold text-gray-700">
                {product.name}
              </h3>

              <div className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </div>
              <div className="text-green-600 font-bold">{product.price}</div>

              {/* Tag */}
              <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {product.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsSection;
