import React from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "./ProductGrid";

const SearchResultsPage = () => {
  const location = useLocation();
  const { results, searchTerm, message } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Search Results for "{searchTerm}"
        </h1>
        {results && (
          <p className="text-gray-600">
            Found {results.length} product{results.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {message ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">{message}</p>
        </div>
      ) : (
        results && <ProductGrid products={results} />
      )}
    </div>
  );
};

export default SearchResultsPage;
