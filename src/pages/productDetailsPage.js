// sceed_frontend/src/pages/productDetailsPage.js
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerOne from "../components/bannerOne";
import BannerTwo from "../components/bannerTwo";
import RelatedProducts from "../components/relatedProducts";
import { API_ENDPOINTS } from "../config/api";
import { Heart, ShoppingCart, Check, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { message, Button } from "antd";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

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
  // Renamed the loading state for useCart to be more specific
  //const { addToCart, loading: isAddingToCart } = useCart();

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const success = await addToCart(id, quantity, selectedColor.name);
      if (success) {
        message.success({
          content: (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span>Added {quantity} item(s) to cart!</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  size="small"
                  className="flex items-center gap-1"
                  onClick={() => navigate("/cart")}>
                  <ShoppingCart size={14} />
                  View Cart
                </Button>
                <Button
                  size="small"
                  type="link"
                  onClick={() => message.destroy()}>
                  <X size={14} />
                </Button>
              </div>
            </div>
          ),
          className: "custom-message",
          duration: 5,
          style: {
            marginTop: "20vh",
          },
        });
      }
    } catch (error) {
      message.error({
        content: (
          <div className="flex items-center gap-2">
            <span className="text-red-500">Failed to add item to cart</span>
          </div>
        ),
        className: "custom-message",
        duration: 3,
      });
    }
  };

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await fetch("/api/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         productId: id,
  //         quantity,
  //         color: selectedColor.name,
  //       }),
  //     });
  //     if (response.ok) {
  //       // Handle success (e.g., show notification, update cart count)
  //     }
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };

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
            {/* Updated Product Info Section */}
            <div className="space-y-8 max-w-xl">
              {/* Product Name */}
              <h1 className="text-2xl font-semibold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center">
                <span className="text-xl font-medium text-gray-900">
                  $ {product.price?.toLocaleString()}
                </span>
              </div>

              {/* Quantity and Add to Cart Row */}
              <div className="flex space-x-4">
                <div>
                  <h3 className=" flex-1 text-lg font-semibold mb-2">
                    Quantity:
                  </h3>
                  <div className="w-full flex items-center space-x-4 border-2 rounded-2xl ">
                    {" "}
                    {/* Added a border to the quantity selector, alt  bg-black text-white */}
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border rounded-full">
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-8 border rounded-full">
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors w-auto ">
                  Add to Cart
                </button>
              </div>

              {/* Buy Now and Favorite Row */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition-colors">
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
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Material:
                  </h3>
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
                          selectedColor?.id === color.id
                            ? "ring-2 ring-offset-2 ring-gray-500"
                            : ""
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
                <p className="text-base text-gray-600">
                  {product.productFeatures}
                </p>
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
