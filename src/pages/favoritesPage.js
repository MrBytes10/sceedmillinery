import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import BannerOne from "../components/bannerOne";
import BannerTwo from "../components/bannerTwo";
import Footer from "../components/Footer";

const FavoritesPage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorite products
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any authentication headers if needed
            // "Authorization": `Bearer ${userToken}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavoriteProducts(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Empty row to separate header - matching homepage style */}
      {/* <div
        style={{ backgroundColor: "#CECDC8" }}
        className="h-10 w-full border"
      /> */}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4">
        {/* Favorites Section */}
        <div className="mt-8 mb-12">
          <h1 className="text-3xl font-bold text-center mb-8">My Favorites</h1>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-xl text-gray-600">Loading your favorites...</p>
            </div>
          ) : favoriteProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                No favorites yet
              </h2>
              <p className="text-gray-500 mb-6">
                You haven't added any products to your favorites yet.
              </p>
              <a
                href="/"
                className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200">
                Browse Products
              </a>
            </div>
          ) : (
            <div className="mb-12">
              <ProductGrid products={favoriteProducts} />
            </div>
          )}
        </div>

        {/* Banners */}
        <BannerOne />
        <BannerTwo />
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
