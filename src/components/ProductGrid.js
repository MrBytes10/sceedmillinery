//sceed_frontend/src/components/ProductGrid.js

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
    <div className="bg-white rounded shadow p-4 border-2 border-transparent hover:border-gray-500 hover:border-4 transition-all duration-300">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover mb-4"
    />
    <h3 className="font-semibold mb-2">{product.name}</h3>
    <p className="text-gray-600 mb-2">{product.price}</p>
    <Link
      to={`/product/${product.id}`}
      className="bg-black text-white px-4 py-2 rounded block text-center">
      View Details
    </Link>
  </div>
);

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
