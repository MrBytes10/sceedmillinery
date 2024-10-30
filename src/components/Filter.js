//sceed_frontend/src/components/Filter.js
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Filter = ({
  priceRange = 10000,
  setPriceRange = () => {},
  discountFilters = {},
  setDiscountFilters = () => {},
  inStock,
  setInStock,
}) => {
  // Initialize local state with props
  const [localDiscountFilters, setLocalDiscountFilters] =
    useState(discountFilters);
  //const [inStock, setInStock] = useState(false);

  // Sync local state when props change
  useEffect(() => {
    setLocalDiscountFilters(discountFilters);
  }, [discountFilters]);

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  const handleDiscountChange = (value) => {
    setLocalDiscountFilters((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const handleApplyFilters = () => {
    // Update parent state with local state
    setDiscountFilters(localDiscountFilters);
  };

  // Define discount options
  const discountOptions = [
    { label: "On Sale", value: "any" },
    { label: "30% or More", value: 30 },
    { label: "20% or More", value: 20 },
    { label: "10% or More", value: 10 },
  ];
  // in Stock is a boolean, so we don't need to define options for it
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

      {/* Discount Percentage Section */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-medium text-[#212121]">
            Discount Percentage
          </h3>
          <ChevronDown size={14} className="text-[#212121]" />
        </div>
        {discountOptions.map((item) => (
          <label
            key={item.value}
            className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={localDiscountFilters[item.value] || false}
              onChange={() => handleDiscountChange(item.value)}
              className="w-3 h-3 accent-[#212121] cursor-pointer"
            />
            <span className="text-xs text-[#212121] ml-2">{item.label}</span>
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
          min="0"
          max="10000"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full h-1 bg-[#D9D9D9] rounded-full appearance-none mb-2 cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(to right, #6C6C6C 0%, #6C6C6C ${
              (priceRange / 10000) * 100
            }%, #D9D9D9 ${(priceRange / 10000) * 100}%, #D9D9D9 100%)`,
          }}
        />
        <div className="p-1 border border-[#212121] rounded text-xs flex items-center justify-between">
          <span className="text-[#212121]">KSh</span>
          <span className="font-bold text-[#757575]">{priceRange}</span>
          <span className="text-[#212121]">and Under</span>
        </div>
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-[#8F8F8F] text-white font-medium text-xs py-2 rounded-[8px] hover:bg-[#6c6c6c] transition-colors mt-3">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
