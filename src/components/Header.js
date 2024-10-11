//sceed_front_two/src/components/Header.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import logoImage from "../images/sceedWhiteLogo.png";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative w-full">
            {/*logo and top text*/}
            <div className="bg-black text-white rounded-b-[10px]">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-0 px-4 sm:px-6 lg:px-8">
                    <img
                        src={logoImage}
                        alt="SceedMillinery"
                        className="w-32 h-auto sm:w-[180px] sm:h-[72px] mb-2 sm:mb-0" /* Reduced size */
                    />
                    <p className="text-center text-base sm:text-lg lg:text-xl font-medium sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2">
                        Contemporary. Bespoke. Elegance
                    </p>
                </div>
            </div>

            {/*navbar*/}
            <div className="bg-white py-2 px-4 sm:px-6 lg:px-8"> {/* Reduced padding */}
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex justify-between w-full sm:w-auto mb-2 sm:mb-0">
                        <div className="flex space-x-4">
                            <Link to="/account" className="text-black hover:text-gray-600">
                                <User size={20} />
                            </Link>
                            <Link to="/cart" className="text-black hover:text-gray-600">
                                <ShoppingCart size={20} />
                            </Link>

                            <Link to="/favorites" className="text-black hover:text-gray-600">
                                <Heart size={20} />
                            </Link>

                            <Link to="/search" className="text-black hover:text-gray-600">
                                <Search size={20} /> {/* Reduced icon size */}
                            </Link>                  

                       
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
                                    className="text-black hover:text-gray-600 font-medium text-sm sm:text-base">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-black hover:text-gray-600 font-medium text-sm sm:text-base">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-black hover:text-gray-600 font-medium text-sm sm:text-base">
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

