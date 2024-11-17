import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";

const Filter = ({
  priceRange = 1000,
  setPriceRange = () => {},
  setSelectedColors = () => {},
  selectedColors = [],
  setSelectedCategory = () => {},
  selectedCategory = null,
  inStock,
  setInStock,
}) => {
  // Local state for all filters
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localSelectedColors, setLocalSelectedColors] =
    useState(selectedColors);
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState(selectedCategory);
  const [localInStock, setLocalInStock] = useState(inStock);

  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [categories] = useState(["Hatinators", "Fascinators"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync local state when props change
  useEffect(() => {
    setLocalPriceRange(priceRange);
    setLocalSelectedColors(selectedColors);
    setLocalSelectedCategory(selectedCategory);
    setLocalInStock(inStock);
  }, [priceRange, selectedColors, selectedCategory, inStock]);

  // Fetch available colors from the API
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.getColors);
        if (!response.ok) {
          throw new Error("Failed to fetch colors");
        }
        const colors = await response.json();
        setAvailableColors(colors);
        setLoading(false);
      } catch (err) {
        setError("Error loading colors");
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const handlePriceChange = (e) => {
    setLocalPriceRange(parseInt(e.target.value));
  };

  const handleColorSelect = (color) => {
    setLocalSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      }
      return [...prev, color];
    });
    setIsColorDropdownOpen(false);
  };

  const handleCategoryChange = (category) => {
    setLocalSelectedCategory(
      category === localSelectedCategory ? null : category
    );
  };

  const handleInStockChange = (checked) => {
    setLocalInStock(checked);
  };

  const applyFilters = () => {
    setPriceRange(localPriceRange);
    setSelectedColors(localSelectedColors);
    setSelectedCategory(localSelectedCategory);
    setInStock(localInStock);
  };

  return (
    <div className="w-full sm:w-[296px] bg-white p-3 rounded-[10px] shadow-[0px_0px_4px_rgba(0,0,0,0.1)] h-[65vh] flex flex-col overflow-y-auto">
      {/* Availability Section */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-medium text-[#212121]">Availability</h3>
          <ChevronDown size={14} className="text-[#212121]" />
        </div>
        <label className="flex items-center mb-1 cursor-pointer">
          <input
            type="checkbox"
            checked={localInStock}
            onChange={(e) => handleInStockChange(e.target.checked)}
            className="w-3 h-3 accent-[#212121] cursor-pointer"
          />
          <span className="text-xs text-[#212121] ml-2">In stock</span>
        </label>
      </div>

      {/* Color Dropdown Section */}
      <div className="mb-5 relative">
        <div
          className="flex justify-between items-center mb-1 cursor-pointer"
          onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}>
          <h3 className="text-xs font-medium text-[#212121]">
            Color{" "}
            <>
              {" "}
              <ChevronDown size={14} className="text-[#212121]" />
            </>
          </h3>
          <ChevronDown
            size={14}
            className={`text-[#212121] transform transition-transform ${
              isColorDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Selected Colors Display */}
        {localSelectedColors.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {localSelectedColors.map((color) => (
              <span
                key={color}
                className="text-xs bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1">
                {color}
                <button
                  onClick={() => handleColorSelect(color)}
                  className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Dropdown Menu */}
        {isColorDropdownOpen && (
          <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
            {loading ? (
              <div className="p-2 text-center text-sm">Loading colors...</div>
            ) : error ? (
              <div className="p-2 text-center text-sm text-red-500">
                {error}
              </div>
            ) : (
              availableColors.map((color) => (
                <div
                  key={color}
                  className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 ${
                    localSelectedColors.includes(color) ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleColorSelect(color)}>
                  {color}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Category Filter Section */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-medium text-[#212121]">Category</h3>
          <ChevronDown size={14} className="text-[#212121]" />
        </div>
        {categories.map((category) => (
          <label
            key={category}
            className={`flex items-center mb-1 cursor-pointer ${
              localSelectedCategory === category
                ? "font-bold text-[#212121]"
                : "text-[#212121]"
            }`}>
            <input
              type="radio"
              checked={localSelectedCategory === category}
              onChange={() => handleCategoryChange(category)}
              className="w-3 h-3 accent-[#212121] cursor-pointer"
            />
            <span className="text-xs ml-2">{category}</span>
          </label>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-medium text-[#212121]">Pricing</h3>
          <ChevronDown size={14} className="text-[#212121]" />
        </div>
        <input
          type="range"
          min="200"
          max="1000"
          value={localPriceRange}
          onChange={handlePriceChange}
          className="w-full h-1 bg-[#D9D9D9] rounded-full appearance-none mb-2 cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(to right, #6C6C6C 0%, #6C6C6C ${
              (localPriceRange / 1000) * 100
            }%, #D9D9D9 ${(localPriceRange / 1000) * 100}%, #D9D9D9 100%)`,
          }}
        />
        <div className="p-1 border border-[#212121] rounded text-xs flex items-center justify-between">
          <span className="text-[#212121]">$</span>
          <span className="font-bold text-[#757575]">{localPriceRange}</span>
          <span className="text-[#212121]">and Under</span>
        </div>
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={applyFilters}
        className="mt-auto w-full bg-[#8F8F8F] text-white font-medium text-xs py-2 rounded-[8px] hover:bg-[#6c6c6c] transition-colors">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
