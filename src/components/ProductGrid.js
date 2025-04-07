//sceed_frontend/src/components/ProductGrid.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const isFavorited = isInFavorites(product.id);

    if (isFavorited) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };

  const productImage =
    product.displayImage || "https://via.placeholder.com/150";

  // Calculate discount percentage only if original price exists AND is higher than current price
  const discountPercentage =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : null;

  return (
    <div className="bg-white rounded shadow border-2 border-transparent hover:border-gray-500 transition-all duration-300 relative flex flex-col h-90">
      <div className="relative h-40 flex-shrink-0">
        {/* Stock badge */}
        {/* {!product.isInStock && (
          <div className="absolute top-12 left-2 z-10 bg-gray-800 text-white px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )} */}

        {/* Sale badge - only shown when there's a valid discount (original price > current price) */}
        {discountPercentage && (
          <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="absolute top-2 left-2 z-10 bg-[#8F8F8F] text-white px-3 py-1 rounded-full cursor-pointer hover:bg-red-600 transition-colors">
            Buy
          </div>
        )}

        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-8 z-10 p-2 rounded-full bg-white/10 hover:bg-white transition-colors"
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
          className="w-full h-40 object-contain"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-playfair font-semibold tracking-wide text-xs mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mb-0">
          <div className="flex flex-col">
            {/* Only show original price if it exists AND is higher than current price */}
            {discountPercentage && (
              <span className="text-gray-500 line-through text-sm">
                $ {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-playfair font-semibold tracking-wide text-xs">
              $ {product.price.toLocaleString()}
            </span>
          </div>
          {/* Discount badge only shown when there's a valid discount */}
          {discountPercentage && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* either show view details button, or out  of stock message */}
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className={`mt-auto px-4 py-2 rounded w-full transition-colors duration-200 ${
            product.isInStock
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!product.isInStock}>
          {product.isInStock ? "View Details" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-600 text-center col-span-full">
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
