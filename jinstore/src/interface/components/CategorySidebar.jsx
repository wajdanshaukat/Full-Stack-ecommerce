import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/categories/");
        const enriched = response.data.map((cat, idx) => ({
          ...cat,
          hasDropdown: idx < 5,
        }));
        setCategories(enriched);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigate = (categoryId) => {
    navigate(`/shop?category_id=${categoryId}`);
  };

  return (
    <aside className="w-[220px] min-w-[220px] bg-white shadow-md hidden lg:block">
      {/* All Categories Toggle Button */}
      <div className="p-4">
        <button
          onClick={() => setCategoryOpen((prev) => !prev)}
          className="w-full flex justify-between items-center p-3 bg-gray-100 text-gray-800 rounded-md font-medium text-base"
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
        <ul className="px-4 pb-4 space-y-3">
          {categories.map((cat, index) => (
            <li key={cat.id}>
              <div
                onClick={() =>
                  cat.hasDropdown
                    ? toggleDropdown(index)
                    : handleNavigate(cat.id)
                }
                className="flex justify-between items-center text-sm text-gray-800 cursor-pointer hover:text-[#634C95]"
              >
                <div className="flex items-center gap-3">
                  {/* Category Image */}
                  <img
                    src={cat.image_path}
                    alt={cat.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className=" font-small">{cat.name}</span>{" "}
                  {/* Adjusted text size */}
                </div>

                {cat.hasDropdown && (
                  <span>
                    {openDropdown === index ? (
                      <FaChevronDown size={14} />
                    ) : (
                      <FaChevronRight size={14} />
                    )}
                  </span>
                )}
              </div>

              {/* Dropdown Subcategories (dummy example) */}
              {openDropdown === index && cat.hasDropdown && (
                <div className="ml-8 mt-2 pl-2 border-l-2 border-gray-200">
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="hover:text-green-600 cursor-pointer">
                      Subcategory 1
                    </li>
                    <li className="hover:text-green-600 cursor-pointer">
                      Subcategory 2
                    </li>
                    <li className="hover:text-green-600 cursor-pointer">
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