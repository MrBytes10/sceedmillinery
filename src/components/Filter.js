//sceed_front_two/src/components/Filter.js

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Filter = () => {
  const [priceRange, setPriceRange] = useState(1600);

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  return (
    <div className="w-full sm:w-[296px] bg-white p-4 sm:p-5 rounded-[15px] shadow-[0px_0px_4px_rgba(0,0,0,0.5)]">
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-[20px] font-medium text-[#212121]">
            Availability
          </h3>
          <ChevronDown size={18} className="text-[#212121]" />
        </div>
        <label className="flex items-center mb-2 sm:mb-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 sm:w-[21px] sm:h-[20px] border-2 sm:border-[3px] border-[#646464] rounded-[5px] mr-2 sm:mr-3"
          />
          <span className="text-sm sm:text-[16px] text-[#212121]">
            In stock
          </span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 sm:w-[21px] sm:h-[20px] border-2 sm:border-[3px] border-[#646464] rounded-[5px] mr-2 sm:mr-3"
          />
          <span className="text-sm sm:text-[16px] text-[#212121]">
            Out of stock
          </span>
        </label>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-[20px] font-medium text-[#212121]">
            Discount Percentage
          </h3>
          <ChevronDown size={18} className="text-[#212121]" />
        </div>
        {["On Sale", "30% or More", "20% or More", "10% or More"].map(
          (item, index) => (
            <label
              key={index}
              className="flex items-center mb-2 sm:mb-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 sm:w-[21px] sm:h-[20px] border-2 sm:border-[3px] border-[#646464] rounded-[5px] mr-2 sm:mr-3"
              />
              <span className="text-sm sm:text-[16px] text-[#212121]">
                {item}
              </span>
            </label>
          )
        )}
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-[20px] font-medium text-[#212121]">
            Pricing
          </h3>
          <ChevronDown size={18} className="text-[#212121]" />
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full h-[7px] bg-[#D9D9D9] rounded-full appearance-none outline-none mb-3 sm:mb-4"
          style={{
            backgroundImage: `linear-gradient(to right, #6C6C6C 0%, #6C6C6C ${
              (priceRange / 5000) * 100
            }%, #D9D9D9 ${(priceRange / 5000) * 100}%, #D9D9D9 100%)`,
          }}
        />
        <div className="p-2 border border-[#212121] rounded-[3px] flex items-center justify-between">
          <span className="text-xs sm:text-[15px] text-[#212121]">KSh</span>
          <span className="text-xs sm:text-[15px] font-bold text-[#757575]">
            {priceRange}
          </span>
          <span className="text-xs sm:text-[15px] text-[#212121]">
            and Under
          </span>
        </div>
      </div>

      <button className="w-full bg-[#8F8F8F] text-white font-bold text-lg sm:text-[20px] py-4 sm:py-[22px] rounded-[10px]">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
