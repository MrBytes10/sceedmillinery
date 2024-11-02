// sceed_frontend/src/components/productInfo.jsx
import React, { useState } from "react";
import { Select } from "antd";
import { Heart } from "lucide-react";

const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  handleAddToCart,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="space-y-8 pl-0 max-w-xl">
      {/* Product Name */}
      <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>

      {/* Price */}
      <div className="flex items-center">
        <span className="text-xl font-medium text-gray-900">
          $ {product.price?.toLocaleString()}
        </span>
      </div>

      {/* Quantity and Add to Cart Row */}
      <div className="flex space-x-4">
        {/* Quantity Selector */}
        <div className="flex-1">
          <Select
            defaultValue="1"
            className="w-full"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
            ]}
          />
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
          Add to Cart
        </button>
      </div>

      {/* Buy Now and Favorite Row */}
      <div className="flex space-x-4">
        <button className="flex-1 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition-colors">
          BUY NOW
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="w-12 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          <Heart
            className={`${
              isFavorite ? "fill-current text-red-500" : "text-gray-400"
            }`}
            size={20}
          />
        </button>
      </div>

      {/* Material and Colors Table */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Material:</h3>
          <p className="text-base text-gray-900">{product.material}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Available Colours:
          </h3>
          <div className="flex space-x-2">
            {product.availableColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor.id === color.id
                    ? "border-black"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: color.code }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Product features:
        </h3>
        <p className="text-base text-gray-600">{product.productFeatures}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
