//sceed_frontend/src/components/ProductGrid.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; // Import Heart icon from lucide-react
import { useFavorites } from "../contexts/FavoritesContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();

  // Handle adding/removing products from favorites
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const isFavorited = isInFavorites(product.id);

    if (isFavorited) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };

  // Use the product's display image or a placeholder image
  const productImage =
    product.displayImage || "https://via.placeholder.com/150";

  // Calculate discount percentage
  const discountPercentage =
    product.originalPrice && product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : null;

  return (
    <div className="bg-white rounded shadow p-4 border-2 border-transparent hover:border-gray-500 transition-all duration-300 relative">
      {/* Sale Badge - only show if there's a discount */}
      {discountPercentage && (
        <div
          onClick={() => navigate(`/product/${product.id}`)}
          className="absolute top-2 left-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-red-600 transition-colors">
          Sale
        </div>
      )}

      {/* Favorites Heart Icon */}
      {/* <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white transition-colors"
        aria-label="Add to favorites">
        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
      </button> */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white transition-colors"
        aria-label={
          isInFavorites(product.id)
            ? "Remove from favorites"
            : "Add to favorites"
        }>
        <Heart
          className={`w-5 h-5 transition-colors ${
            isInFavorites(product.id)
              ? "text-red-500 fill-current"
              : "text-gray-600 hover:text-red-500"
          }`}
        />
      </button>

      <img
        src={productImage}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="font-semibold mb-2">{product.name}</h3>
      <div className="flex justify-between items-center mb-2">
        <div>
          {product.originalPrice && (
            <span className="text-gray-500 line-through mr-2">
              KES {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="font-semibold">
            KES {product.price.toLocaleString()}
          </span>
        </div>
        {discountPercentage && (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* <div className="flex gap-1 mb-2">
        {product.availableColors && product.availableColors.length > 0 ? (
          product.availableColors.map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color.code }}
              title={color.name}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No colors available</p>
        )}
      </div> */}

      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="bg-black text-white px-4 py-2 rounded block text-center w-full hover:bg-gray-800 transition-colors duration-200">
        View Details
      </button>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-600 text-center">
          No products found within that Price Range.
        </p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductGrid;
