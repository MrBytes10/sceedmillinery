// sceed_frontend/src/config/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5284/api";

export const API_ENDPOINTS = {
  getProducts: `${API_BASE_URL}/products`, // Retrieve all products, optionally with filters

  getProduct: (id) => `${API_BASE_URL}/products/${id}`, // Retrieve a single product by ID

  getRelatedProducts: (id) => `${API_BASE_URL}/products/related/${id}`, // Retrieve related products by product ID

  createProduct: `${API_BASE_URL}/products/CreateProduct`, // Create a new product

  deleteProduct: (id) => `${API_BASE_URL}/products/${id}`, // Delete a product by ID

  updateProduct: (id) => `${API_BASE_URL}/products/${id}`, // Update an existing product by ID

  // User APIs
  registerUser: `${API_BASE_URL}/users/register`, // Register a new user
  loginUser: `${API_BASE_URL}/users/login`, // Log in an existing user
  googleLoginUser: `${API_BASE_URL}/users/google-login`, // Log in with Google

  // Subscription APIs
  subscribeUser: `${API_BASE_URL}/users/subscribe`, // Subscribe user to mailing list
};

// Default headers for API calls
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  // Add any authentication headers here if needed
  // 'Authorization': `Bearer ${getToken()}`,
};

// Utility function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to get error message from response
    let errorMessage;
    try {
      const errorData = await response.text();
      errorMessage = errorData;
    } catch {
      errorMessage = `HTTP error! status: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// API utility functions
export const api = {
  // GET request
  get: async (endpoint) => {
    const response = await fetch(endpoint, {
      headers: DEFAULT_HEADERS,
    });
    return handleResponse(response);
  },

  // POST request
  post: async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // PUT request
  put: async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // DELETE request
  delete: async (endpoint) => {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: DEFAULT_HEADERS,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  },
};

export default API_BASE_URL;
