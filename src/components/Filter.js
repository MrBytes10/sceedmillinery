import React from "react";
import { ChevronDown } from "lucide-react";

const Filter = ({ priceRange, setPriceRange }) => {
  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  return (
    <div className="w-full sm:w-[296px] bg-white p-2 sm:p-3 rounded-[10px] shadow-[0px_0px_4px_rgba(0,0,0,0.5)] h-[64vh] flex flex-col justify-between">
      {/* Availability Section */}
      <div className="mb-2 sm:mb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm sm:text-[14px] font-medium text-[#212121]">
            Availability
          </h3>
          <ChevronDown size={16} className="text-[#212121]" />
        </div>
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] border sm:border-[2px] border-[#646464] rounded-[4px] mr-2"
          />
          <span className="text-xs sm:text-[14px] text-[#212121]">
            In stock
          </span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] border sm:border-[2px] border-[#646464] rounded-[4px] mr-2"
          />
          <span className="text-xs sm:text-[14px] text-[#212121]">
            Out of stock
          </span>
        </label>
      </div>

      {/* Discount Percentage Section */}
      <div className="mb-2 sm:mb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm sm:text-[14px] font-medium text-[#212121]">
            Discount Percentage
          </h3>
          <ChevronDown size={16} className="text-[#212121]" />
        </div>
        {["On Sale", "30% or More", "20% or More", "10% or More"].map(
          (item, index) => (
            <label
              key={index}
              className="flex items-center mb-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] border sm:border-[2px] border-[#646464] rounded-[4px] mr-2"
              />
              <span className="text-xs sm:text-[14px] text-[#212121]">
                {item}
              </span>
            </label>
          )
        )}
      </div>

      {/* Pricing Section */}
      <div className="mb-2 sm:mb-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm sm:text-[14px] font-medium text-[#212121]">
            Pricing
          </h3>
          <ChevronDown size={16} className="text-[#212121]" />
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full h-[5px] bg-[#D9D9D9] rounded-full appearance-none mb-2"
          style={{
            backgroundImage: `linear-gradient(to right, #6C6C6C 0%, #6C6C6C ${
              (priceRange / 10000) * 100
            }%, #D9D9D9 ${(priceRange / 10000) * 100}%, #D9D9D9 100%)`,
          }}
        />
        <div className="p-1 border border-[#212121] rounded-[3px] flex items-center justify-between">
          <span className="text-xs sm:text-[12px] text-[#212121]">KSh</span>
          <span className="text-xs sm:text-[12px] font-bold text-[#757575]">
            {priceRange}
          </span>
          <span className="text-xs sm:text-[12px] text-[#212121]">
            and Under
          </span>
        </div>
      </div>

      {/* Apply Filter Button */}
      <div className="mt-auto">
        <button className="w-full bg-[#8F8F8F] text-white font-bold text-sm sm:text-base py-2 sm:py-3 rounded-[8px] hover:bg-[#6c6c6c] transition-colors">
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
