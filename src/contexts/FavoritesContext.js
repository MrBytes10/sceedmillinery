// src/context/FavoritesContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Fetch initial favorites
  const fetchFavorites = useCallback(async () => {
    try {
      const response = await fetch("/api/favorites");
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
        setFavoritesCount(data.length);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, []);

  // Add to favorites
  const addToFavorites = useCallback(async (product) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        setFavorites((prev) => [...prev, product]);
        setFavoritesCount((prev) => prev + 1);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      return false;
    }
  }, []);

  // Remove from favorites
  const removeFromFavorites = useCallback(async (productId) => {
    try {
      const response = await fetch(`/api/favorites/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
        setFavoritesCount((prev) => prev - 1);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return false;
    }
  }, []);

  // Check if a product is in favorites
  const isInFavorites = useCallback(
    (productId) => {
      return favorites.some((item) => item.id === productId);
    },
    [favorites]
  );

  const value = {
    favorites,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    fetchFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
