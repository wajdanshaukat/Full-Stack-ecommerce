import { useState } from "react";
import {
  FaAppleAlt,
  FaFish,
  FaEgg,
  FaCookie,
  FaWineBottle,
  FaSnowflake,
  FaPumpSoap,
  FaBaby,
  FaHeart,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const categories = [
  { icon: <FaAppleAlt />, label: "Fruits & Vegetables", hasDropdown: true },
  { icon: <FaFish />, label: "Meat & Seafood", hasDropdown: true },
  { icon: <FaEgg />, label: "Breakfast & Dairy", hasDropdown: true },
  { icon: <FaCookie />, label: "Biscuits & Snacks", hasDropdown: true },
  { icon: <FaWineBottle />, label: "Beverages", hasDropdown: true },
  { icon: <FaSnowflake />, label: "Frozen Foods", hasDropdown: false },
  { icon: <FaPumpSoap />, label: "Grocery & Staples", hasDropdown: false },
  { icon: <FaHeart />, label: "Healthcare", hasDropdown: false },
  { icon: <FaBaby />, label: "Baby & Pregnancy", hasDropdown: false },
];

const CategorySidebar = () => {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <aside className="w-[250px] min-w-[250px] bg-white shadow-lg rounded-lg hidden lg:block overflow-hidden">
      {/* All Categories Toggle */}
      <div className="p-4 border-b">
        <button
          onClick={() => setCategoryOpen((prev) => !prev)}
          className="w-full flex justify-between items-center px-4 py-2 bg-[#F5F5F5] text-gray-800 rounded-md font-semibold text-sm hover:bg-[#eee] transition"
        >
          All Categories
          <FaChevronDown
            className={`transition-transform duration-200 ${
              categoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Category List */}
      {categoryOpen && (
        <ul className="px-4 py-4 space-y-2">
          {categories.map((cat, index) => (
            <li key={index}>
              <div
                onClick={() => cat.hasDropdown && toggleDropdown(index)}
                className="flex justify-between items-center text-sm text-gray-700 px-3 py-2 rounded-md cursor-pointer hover:bg-[#F0F0F0] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl text-black-100">{cat.icon}</span>
                  <span className="font-medium">{cat.label}</span>
                </div>
                {cat.hasDropdown && (
                  <span>
                    {openDropdown === index ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronRight size={12} />
                    )}
                  </span>
                )}
              </div>

              {/* Subcategory Dropdown */}
              {openDropdown === index && cat.hasDropdown && (
                <div className="ml-8 mt-2 pl-2 border-l-2 border-gray-200">
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="hover:text-[#634C95] cursor-pointer transition">
                      Subcategory 1
                    </li>
                    <li className="hover:text-[#634C95] cursor-pointer transition">
                      Subcategory 2
                    </li>
                    <li className="hover:text-[#634C95] cursor-pointer transition">
                      Subcategory 3
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default CategorySidebar;