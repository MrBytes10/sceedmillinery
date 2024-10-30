import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

const SearchBar = ({
  onSearch,
  disabled = false,
  placeholder = "Search for Product",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  // Handle clicking outside of search
  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add and remove click outside listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close search
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`text-black hover:text-gray-600 transition-colors duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={disabled}>
          <Search size={20} />
        </button>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={`
                            w-62 h-8 pl-8 pr-2 
                            border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${
                              disabled
                                ? "bg-gray-100 cursor-not-allowed"
                                : "bg-white"
                            }
                        `}
          />
          <button
            type="submit"
            disabled={disabled}
            className={`
                            absolute left-2 
                            text-gray-500 hover:text-gray-700
                            ${
                              disabled ? "cursor-not-allowed" : "cursor-pointer"
                            }
                        `}>
            <Search size={16} />
          </button>
        </form>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SearchBar;
