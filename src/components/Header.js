//sceed_frontend/src/components/Header.js

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import logoImage from "../images/sceedWhiteLogo.png";
import SearchBar from "./SearchBar";
import { useSearch } from "./SearchContext";

// Assume this is your product data. In a real app, this would likely come from an API or database.
const products = [
  {
    id: 1,
    name: "Feathered Veil Pearl Fascinator",
    price: 1300,
    productFeatures: "Elegant red feathered fascinator with pearls",
  },
  {
    id: 2,
    name: "Nested Feather Fascinator",
    price: 1700,
    productFeatures: "Beautiful blue nested feather fascinator",
  },
  // ... add more products
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { updateSearchResults } = useSearch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (route)

  const calculateRelevance = (product, searchTerm) => {
    const searchLower = searchTerm.toLowerCase();
    const nameLower = product.name.toLowerCase();
    const descLower = product.productFeatures.toLowerCase();

    let score = 0;
    if (nameLower.includes(searchLower)) score += 2;
    if (descLower.includes(searchLower)) score += 1;

    return score;
  };

  // handleSearch
  const handleSearch = (searchTerm) => {
    const results = products
      .map((product) => ({
        ...product,
        relevance: calculateRelevance(product, searchTerm),
      }))
      .filter((product) => product.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    updateSearchResults(results, searchTerm);
    navigate("/search-results");
  };

  // Determine if a link is active by comparing current URL
  const isActive = (path) => location.pathname === path;

  return (
    <header className="relative w-full">
      {/* logo and top text */}
      <div className="bg-black text-white rounded-b-[10px]">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-0 px-4 sm:px-6 lg:px-8">
          <img
            src={logoImage}
            alt="SceedMillinery"
            className="w-32 h-auto sm:w-[180px] sm:h-[72px] mb-2 sm:mb-0"
          />
          <p className="text-center text-base sm:text-lg lg:text-xl font-medium font-poppins sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2">
            Contemporary. Bespoke. Elegance
          </p>
        </div>
      </div>

      {/* navbar */}
      <div className="bg-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-between w-full sm:w-auto mb-2 sm:mb-0">
            <div className="flex space-x-4">
              <Link to="/sign-up" className="text-black hover:text-gray-600">
                <User size={20} />
              </Link>
              <Link to="/cart" className="text-black hover:text-gray-600">
                <ShoppingCart size={20} />
              </Link>
              <Link to="/favorites" className="text-black hover:text-gray-600">
                <Heart size={20} />
              </Link>
              <SearchBar onSearch={handleSearch} /> {/*search icon/component*/}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden text-black hover:text-gray-600">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <nav className={`${isMenuOpen ? "block" : "hidden"} sm:block`}>
            <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <li>
                <Link
                  to="/"
                  className={`text-black hover:text-gray-600 font-medium font-poppins text-sm sm:text-base ${
                    isActive("/") ? "opacity-50" : ""
                  }`}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`text-black hover:text-gray-600 font-medium text-sm sm:text-base ${
                    isActive("/about") ? "opacity-50" : ""
                  }`}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-black hover:text-gray-600 font-medium text-sm sm:text-base ${
                    isActive("/contact") ? "opacity-50" : ""
                  }`}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
