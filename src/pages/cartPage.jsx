// sceed_frontend/src/pages/cartPage.js
// CartPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerOne from "../components/bannerOne";
import BannerTwo from "../components/bannerTwo";
import { Heart } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: "Floral Disc Fascinator",
      price: 1700,
      salePrice: 1300,
      color: "Dark Red",
      image: "/path-to-image",
      discount: "24% OFF",
    },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleFavorite = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-medium mb-8">
            Products you added to the Cart will appear here
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex space-x-4">
                    <div className="relative w-48">
                      <span className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 text-sm rounded">
                        Sale
                      </span>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded"
                      />
                      <button
                        onClick={() => handleFavorite(item.id)}
                        className="absolute top-2 right-2">
                        <Heart
                          className={
                            item.isFavorite
                              ? "text-pink-500 fill-current"
                              : "text-gray-400"
                          }
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-medium">{item.name}</h3>
                      <div className="mt-2">
                        <span className="bg-pink-500 text-white px-2 py-1 text-sm rounded">
                          {item.discount}
                        </span>
                        <div className="mt-2 space-x-2">
                          <span className="line-through text-gray-500">
                            KES {item.price}
                          </span>
                          <span className="text-pink-500">
                            KES {item.salePrice}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium">Product features:</h4>
                        <p className="text-gray-600 mt-1">
                          Delicate handmade - The cute fascinator has mixed
                          details including, a floral design, a disc and
                          feathers.
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Material:</h4>
                          <p className="text-gray-600">Polyester.</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Available Colours:</h4>
                          <p className="text-gray-600">
                            Dark Red, Green, Turquoise, Blue Purple
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-medium mb-4">Cart Summary</h2>
                <p className="text-gray-500 mb-4">Shipping Fees not Included</p>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span>Subtotal:</span>
                    <span className="text-pink-500">KES XX,XXX</span>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors">
                    CheckOut for KES XX,000
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BannerOne />
        <BannerTwo />
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
