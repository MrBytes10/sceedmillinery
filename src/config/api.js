// sceed_frontend/src/config/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5284/api";

export const API_ENDPOINTS = {
  // Product APIs
  getProducts: `${API_BASE_URL}/products`, // Retrieve all products, optionally with filters

  getProduct: (id) => `${API_BASE_URL}/products/${id}`, // Retrieve a single product by ID

  getRelatedProducts: (id) => `${API_BASE_URL}/products/related/${id}`, // Retrieve related products by product ID

  createProduct: `${API_BASE_URL}/products/CreateProduct`, // Create a new product

  deleteProduct: (id) => `${API_BASE_URL}/products/${id}`, // Delete a product by ID

  updateProduct: (id) => `${API_BASE_URL}/products/${id}`, // Update an existing product by ID
  // Stock APIs
  getStock: (id) => `${API_BASE_URL}/products/${id}/stock`,
  updateStock: (id) => `${API_BASE_URL}/products/${id}/stock`, // Update stock quantity for a product by ID
  // User APIs
  registerUser: `${API_BASE_URL}/users/register`, // Register a new user
  loginUser: `${API_BASE_URL}/users/login`, // Log in an existing user
  googleLoginUser: `${API_BASE_URL}/users/google-login`, // Log in with Google
  getUserProfile: `${API_BASE_URL}/users/profile`, // Get user profile details
  updateUserProfile: `${API_BASE_URL}/users/profile`, // Update user profile details

  // Subscription APIs
  subscribeUser: `${API_BASE_URL}/users/subscribe`, // Subscribe user to mailing list
};

export default API_BASE_URL;
