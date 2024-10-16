import React from "react";
import { ChevronDown } from "lucide-react";

const Filter = ({ priceRange, setPriceRange }) => {
  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  return (
    <div className="w-full sm:w-[296px] bg-white p-3 rounded-[10px] shadow-[0px_0px_4px_rgba(0,0,0,0.1)] h-[65vh] flex flex-col overflow-y-auto">
      {/* Availability Section */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-medium text-[#212121]">Availability</h3>
          <ChevronDown size={14} className="text-[#212121]" />
        </div>
        <label className="flex items-center mb-1">
          <input
            type="checkbox"
            className="w-3 h-3 border border-[#646464] rounded-sm mr-2"
          />
          <span className="text-xs text-[#212121]">In stock</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-3 h-3 border border-[#646464] rounded-sm mr-2"
          />
          <span className="text-xs text-[#212121]">Out of stock</span>
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
        {["On Sale", "30% or More", "20% or More", "10% or More"].map(
          (item, index) => (
            <label key={index} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="w-3 h-3 border border-[#646464] rounded-sm mr-2"
              />
              <span className="text-xs text-[#212121]">{item}</span>
            </label>
          )
        )}
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
          className="w-full h-1 bg-[#D9D9D9] rounded-full appearance-none mb-2"
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
      <button className="w-full bg-[#8F8F8F] text-white font-medium text-xs py-2 rounded-[8px] hover:bg-[#6c6c6c] transition-colors mt-3">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
