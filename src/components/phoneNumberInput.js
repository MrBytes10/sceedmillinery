import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ReactComponent as UgandanFlag } from "../assets/icons/UgandanFlag.svg"; // Update this path as needed

const PhoneNumberInput = ({
  inputFormat,
  setInputFormat,
  formData,
  handleChange,
  errors,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionChange = (newFormat) => {
    setInputFormat(newFormat);
    setDropdownOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <div className="flex">
        {/* Custom dropdown trigger and flag */}
        <div className="relative">
          <div
            className="flex items-center h-full cursor-pointer border border-gray-300 rounded-l-md px-2"
            onClick={toggleDropdown}>
            <ChevronDown className="w-4 h-4 text-gray-600 mr-2" />
            <UgandanFlag
              alt="KE"
              className="h-full object-contain m-[1px]" // Full height of container with a minimal margin
              aria-hidden="true"
            />
          </div>

          {/* Dropdown options */}
          {dropdownOpen && (
            <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full">
              <div
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  inputFormat === "national" ? "font-bold" : ""
                }`}
                onClick={() => handleOptionChange("national")}>
                0
              </div>
              <div
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  inputFormat === "international" ? "font-bold" : ""
                }`}
                onClick={() => handleOptionChange("international")}>
                +254
              </div>
            </div>
          )}
        </div>

        {/* Phone number input field */}
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder={
            inputFormat === "national"
              ? "712 345 678 or 112 345 678"
              : "712 345 678 or 112 345 678"
          }
          className={`flex-1 px-4 py-2 border border-l-0 rounded-r-md focus:ring-black focus:border-black ${
            errors.phoneNumber ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {/* Error message for validation */}
      {errors.phoneNumber && (
        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
