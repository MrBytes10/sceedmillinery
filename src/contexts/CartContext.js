// src/contexts/CartContext.js
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { API_ENDPOINTS } from "../config/api";

// Create a context to hold the cart state and actions
const CartContext = createContext();

// Reducer function to manage cart state updates based on dispatched actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": // Set entire cart with fetched data
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "ADD_ITEM": // Add a new item to the cart
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "UPDATE_ITEM": // Update quantity of an existing item
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "REMOVE_ITEM": // Remove an item from the cart by id
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART": // Clear all items from the cart
      return {
        ...state,
        items: [],
      };
    case "SET_LOADING": // Set loading state for async operations
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR": // Set error state when an error occurs
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
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

  // Fetch initial cart data when the component mounts
  const fetchCart = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(API_ENDPOINTS.cart);
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      dispatch({ type: "SET_CART", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // Add item to cart and update state
  const addToCart = useCallback(async (productId, quantity, color) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(API_ENDPOINTS.cart, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, color }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");
      const data = await response.json();
      dispatch({ type: "ADD_ITEM", payload: data });
      dispatch({ type: "SET_LOADING", payload: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  }, []);

  // Update an item’s quantity in the cart
  const updateCartItem = useCallback(async (itemId, quantity) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${API_ENDPOINTS.cart}/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quantity),
      });
      if (!response.ok) throw new Error("Failed to update cart item");
      dispatch({ type: "UPDATE_ITEM", payload: { id: itemId, quantity } });
      dispatch({ type: "SET_LOADING", payload: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  }, []);

  // Remove an item from the cart
  const removeFromCart = useCallback(async (itemId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${API_ENDPOINTS.cart}/${itemId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove item from cart");
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
      dispatch({ type: "SET_LOADING", payload: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  }, []);

  // Clear the cart of all items
  const clearCart = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${API_ENDPOINTS.cart}/clear`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to clear cart");
      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "SET_LOADING", payload: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  }, []);

  // Initialize cart by fetching data once on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
