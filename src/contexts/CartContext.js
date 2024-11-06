// src/contexts/CartContext.js
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { API_ENDPOINTS } from "../config/api";

// Create the Cart context
const CartContext = createContext();

// Reducer function to manage cart state updates based on dispatched actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, items: action.payload, loading: false };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false,
    error: null,
  });

  const getHeaders = useCallback(() => {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }, []);

  // Fetch initial cart data
  const fetchCart = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(API_ENDPOINTS.cart, {
        credentials: "include",
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      dispatch({ type: "SET_CART", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [getHeaders]);

  // Merge cart items after login
  const mergeCart = useCallback(async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.cart}/merge`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to merge cart");

      // Re-fetch cart to get updated data post-merge
      await fetchCart();
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [getHeaders, fetchCart]);

  // Listen for auth state changes to trigger merge or fetch
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        mergeCart();
      } else {
        fetchCart();
      }
    };

    // Trigger initial fetch/merge on mount
    handleAuthChange();

    // Listen for storage events for cross-tab login/logout handling
    window.addEventListener("storage", (e) => {
      if (e.key === "authToken") {
        handleAuthChange();
      }
    });

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [mergeCart, fetchCart]);

  // Define action methods for cart management
  const addToCart = useCallback(
    async (productId, quantity, color) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await fetch(API_ENDPOINTS.cart, {
          method: "POST",
          credentials: "include",
          headers: getHeaders(),
          body: JSON.stringify({ productId, quantity, color }),
        });
        if (!response.ok) throw new Error("Failed to add item to cart");
        const data = await response.json();
        dispatch({ type: "ADD_ITEM", payload: data });
        dispatch({ type: "SET_LOADING", payload: false });
        return true; // Return success boolean
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
        dispatch({ type: "SET_LOADING", payload: false });
        return false; // Return failure boolean
      }
    },
    [getHeaders]
  );

  const updateCartItem = useCallback(
    async (itemId, quantity) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await fetch(`${API_ENDPOINTS.cart}/${itemId}`, {
          method: "PUT",
          credentials: "include",
          headers: getHeaders(),
          body: quantity.toString(), //orJSON.stringify({ quantity }) // Send quantity as request body
        });
        if (!response.ok) throw new Error("Failed to update cart item");
        dispatch({ type: "UPDATE_ITEM", payload: { id: itemId, quantity } });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [getHeaders]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await fetch(`${API_ENDPOINTS.cart}/${itemId}`, {
          method: "DELETE",
          credentials: "include",
          headers: getHeaders(),
        });
        if (!response.ok) throw new Error("Failed to remove item from cart");
        dispatch({ type: "REMOVE_ITEM", payload: itemId });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [getHeaders]
  );

  const clearCart = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${API_ENDPOINTS.cart}/clear`, {
        method: "POST",
        credentials: "include",
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error("Failed to clear cart");
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [getHeaders]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
        mergeCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
