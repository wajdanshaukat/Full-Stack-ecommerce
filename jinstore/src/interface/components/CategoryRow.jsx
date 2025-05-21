import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryRow = () => {
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Auto rotate on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        rotateRight();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [categories, isMobile]);

  const rotateLeft = () => {
    const last = categories[categories.length - 1];
    const rest = categories.slice(0, categories.length - 1);
    setCategories([last, ...rest]);
  };

  const rotateRight = () => {
    const [first, ...rest] = categories;
    setCategories([...rest, first]);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {/* Left Arrow - visible only on sm+ */}
          <button
            onClick={rotateLeft}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-sm sm:flex hidden"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700" />
          </button>

          {/* Categories */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => navigate(`/shop?category_id=${category.id}`)}
                className="cursor-pointer flex-shrink-0 flex flex-col items-center space-y-2 text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 relative overflow-visible flex items-center justify-center">
                  <img
                    src={category.image_path}
                    alt={category.name}
                    className="w-20 h-20 sm:w-28 sm:h-28 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* Right Arrow - visible only on sm+ */}
          <button
            onClick={rotateRight}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-sm sm:flex hidden"
          >
            <ChevronRight className="w-7 h-7 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryRow;
