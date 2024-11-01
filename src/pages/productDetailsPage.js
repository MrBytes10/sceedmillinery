import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerOne from "../components/bannerOne";
import BannerTwo from "../components/bannerTwo";
import RelatedProducts from "../components/relatedProducts";
import { API_ENDPOINTS } from "../config/api";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.getProduct(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Product details response:", data);
      setProduct(data);
      // Set initial selected color using the first available color
      setSelectedColor(data.availableColors[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  }, [id]);

  const fetchRelatedProducts = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.getRelatedProducts(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRelatedProducts(data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
    fetchRelatedProducts();
  }, [fetchProductDetails, fetchRelatedProducts]);

  // Helper function to get image URL for a specific color
  const getImageForColor = (colorName) => {
    const imageObj = product.images.find((img) => img.color === colorName);
    return imageObj ? imageObj.image : "";
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity,
          color: selectedColor.name,
        }),
      });
      if (response.ok) {
        // Handle success (e.g., show notification, update cart count)
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-8 py-8 h-90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Product Images */}
            <div className="flex space-x-4 items-start pr-0">
              {/* Selected Color Image */}
              <div className="w-2/3 h-[96%">
                <img
                  src={getImageForColor(selectedColor.name)}
                  alt={`${product.name} in ${selectedColor.name}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              {/* Color Options */}
              <div className="grid grid-cols-1 gap-2 w-1/6">
                {product.availableColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`border-2 rounded-md p-1 ${
                      selectedColor.id === color.id
                        ? "border-black"
                        : "border-gray-200"
                    }`}>
                    <div className="w-full h-[60px]">
                      <img
                        src={getImageForColor(color.name)}
                        alt={`${product.name} in ${color.name}`}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 pl-0">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-semibold">
                  KES {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    KES {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Available Colours:
                </h3>
                <div className="flex space-x-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
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

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border rounded-full">
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border rounded-full">
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                Add to Cart
              </button>

              {/* Product Features */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Product Features:
                </h3>
                <p className="text-gray-600">{product.productFeatures}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">You May Also Like...</h2>
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>

        <BannerOne />
        <BannerTwo />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
