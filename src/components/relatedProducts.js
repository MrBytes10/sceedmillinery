// src/components/RelatedProducts.js

import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const RelatedProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden relative group">
          {/* Wishlist button */}
          <button
            className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white"
            aria-label="Add to wishlist">
            {/* Use the Heart icon from Lucide */}
            <Heart className="w-5 h-5" />

            {/* <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg> */}
          </button>

          {/* Product Image */}
          <Link to={`/product/${product.id}`}>
            <div className="aspect-w-1 aspect-h-1 w-full">
              <img
                src={Object.values(product.images)[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="p-4">
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {product.name}
              </h3>
            </Link>

            <div className="flex justify-between items-center">
              <div>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through mr-2">
                    KES {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-900">
                  KES {product.price.toLocaleString()}
                </span>
              </div>

              {product.discountPercentage && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-100 text-red-800 text-xs font-medium">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;