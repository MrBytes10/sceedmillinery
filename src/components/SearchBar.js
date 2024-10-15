import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchTerm('');
        setIsOpen(false);
    };

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-black hover:text-gray-600"
                >
                    <Search size={20} />
                </button>
            ) : (
                    <form onSubmit={handleSubmit} className="relative flex justify-center items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for Product"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-62 h-6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </form>

            )}
        </div>
    );
};

export default SearchBar;