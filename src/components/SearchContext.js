import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchResults = (results, term) => {
        setSearchResults(results);
        setSearchTerm(term);
    };

    return (
        <SearchContext.Provider value={{ searchResults, searchTerm, updateSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);