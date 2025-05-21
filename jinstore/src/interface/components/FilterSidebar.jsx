import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FilterSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected categories from URL
  const selectedCategoryIds = searchParams.get("category_id")
    ? searchParams.get("category_id").split(",").map(Number)
    : [];

  // Initialize min and max price from URL on first load
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");

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

  const handleCategoryChange = (categoryId) => {
    let updatedCategoryIds;
    if (selectedCategoryIds.includes(categoryId)) {
      updatedCategoryIds = selectedCategoryIds.filter(
        (id) => id !== categoryId
      );
    } else {
      updatedCategoryIds = [...selectedCategoryIds, categoryId];
    }

    const newParams = new URLSearchParams(searchParams.toString());
    if (updatedCategoryIds.length > 0) {
      newParams.set("category_id", updatedCategoryIds.join(","));
    } else {
      newParams.delete("category_id");
    }

    setSearchParams(newParams);
  };

  const handlePriceChange = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (minPrice) {
      newParams.set("min_price", minPrice);
    } else {
      newParams.delete("min_price");
    }

    if (maxPrice) {
      newParams.set("max_price", maxPrice);
    } else {
      newParams.delete("max_price");
    }

    setSearchParams(newParams);
  };

  const clearPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("min_price");
    newParams.delete("max_price");
    setSearchParams(newParams);
  };

  return (
    <>
      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700">Price</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="$0"
            className="border border-gray-300 w-20 px-2 py-1 text-sm rounded"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-gray-500">–</span>
          <input
            type="number"
            placeholder="$30"
            className="border border-gray-300 w-20 px-2 py-1 text-sm rounded"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button
          onClick={handlePriceChange}
          className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Filter
        </button>
        <button
          onClick={clearPriceFilter}
          className="mt-2 ml-2 px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
        >
          Clear Filter
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700">Product Categories</h3>
        <ul className="text-sm space-y-1 text-gray-600">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500"
                  checked={selectedCategoryIds.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <span className="ml-2">{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700">Filter by Color</h3>
        <label className="text-sm text-gray-600 inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          <span className="ml-2">
            Green{" "}
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 ml-1"></span>
          </span>
        </label>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700">Filter by Brands</h3>
        <label className="text-sm text-gray-600 inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          <span className="ml-2">Fresh</span>
        </label>
      </div>

      {/* Status */}
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700">Product Status</h3>
        <label className="text-sm text-gray-600 inline-flex items-center block">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          <span className="ml-2">In Stock</span>
        </label>
        <br />
        <label className="text-sm text-gray-600 inline-flex items-center block">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          <span className="ml-2">On Sale</span>
        </label>
      </div>
    </>
  );
};

export default FilterSidebar;
