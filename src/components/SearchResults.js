import React from 'react';
import { useSearch } from './SearchContext';
import { SearchX } from 'lucide-react';

const SearchResults = () => {
    const { searchResults, searchTerm } = useSearch();

    if (searchResults.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 p-6 bg-gray-100 rounded-md shadow-md">
                {/*icon for no results found*/}
                <SearchX className="w-12 h-12 text-gray-500 mb-2" />


                <p className="text-xl font-semibold text-gray-700">No results found for "<span className="text-red-500">{searchTerm}</span>"</p>
                <p className="text-gray-700 mt-2">Try searching for a different keyword or check your spelling.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Search Results for "{searchTerm}"</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
                        <h3 className="font-bold">{product.name}</h3>
                        <p>KES {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
