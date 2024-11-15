import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Filter = ({
  priceRange = 1000,
  setPriceRange = () => {},
  availableColors = [],
  setSelectedColors = () => {},
  selectedColors = [],
  categories = ["Hatinators", "Fascinators"],
  setSelectedCategory = () => {},
  selectedCategory = null,
  inStock,
  setInStock,
}) => {
  // Initialize local state with props
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localSelectedColors, setLocalSelectedColors] =
    useState(selectedColors);
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState(selectedCategory);

  // Sync local state when props change
  useEffect(() => {
    setLocalPriceRange(priceRange);
    setLocalSelectedColors(selectedColors);
    setLocalSelectedCategory(selectedCategory);
  }, [priceRange, selectedColors, selectedCategory]);

  const handlePriceChange = (e) => {
    setLocalPriceRange(parseInt(e.target.value));
    setPriceRange(parseInt(e.target.value));
  };

  const handleColorChange = (color) => {
    setLocalSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      } else {
        return [...prev, color];
      }
    });
    setSelectedColors(localSelectedColors);
  };

  const handleCategoryChange = (category) => {
    setLocalSelectedCategory(category);
    setSelectedCategory(category);
  };

  const handleInStockChange = (checked) => {
    setInStock(checked);
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
            checked={inStock}
            onChange={(e) => handleInStockChange(e.target.checked)}
            className="w-3 h-3 accent-[#212121] cursor-pointer"
          />
          <span className="text-xs text-[#212121] ml-2">In stock</span>
        </label>
      </div>

      {/* Color Filter Section */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-medium text-[#212121]">Color</h3>
          <ChevronDown size={14} className="text-[#212121]" />
        </div>
        {availableColors.map((color) => (
          <label key={color} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={localSelectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
              className="w-3 h-3 accent-[#212121] cursor-pointer"
            />
            <span className="text-xs text-[#212121] ml-2">{color}</span>
          </label>
        ))}
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
          <span className="text-[#212121]">KSh</span>
          <span className="font-bold text-[#757575]">{localPriceRange}</span>
          <span className="text-[#212121]">and Under</span>
        </div>
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={() => {
          setPriceRange(localPriceRange);
          setSelectedColors(localSelectedColors);
          setSelectedCategory(localSelectedCategory);
        }}
        className="w-full bg-[#8F8F8F] text-white font-medium text-xs py-2 rounded-[8px] hover:bg-[#6c6c6c] transition-colors mt-3">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
