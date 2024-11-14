// sceed_frontend/src/config/api.js



  const API_BASE_URL =
    "https://sceedbackend.pensoft.co.ke/api" || "http://localhost:5284/api";

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

  // Cart APIs/Endpoints
  cart: `${API_BASE_URL}/cart`, // Retrieve cart items
  addToCart: `${API_BASE_URL}/cart`, // Add item to cart
  updateCartItem: (itemId) => `${API_BASE_URL}/cart/${itemId}`, // Update item quantity in cart
  removeFromCart: (itemId) => `${API_BASE_URL}/cart/${itemId}`, // Remove item from cart
  clearCart: `${API_BASE_URL}/cart/clear`, // Clear all items from cart
  mergeCart: `${API_BASE_URL}/cart/merge`, // Merge anonymous cart with user cart

  // Order APIs
  createOrder: `${API_BASE_URL}/orders`,
  getOrder: (id) => `${API_BASE_URL}/orders/${id}`,
  getUserOrders: (userId) => `${API_BASE_URL}/orders/user/${userId}`,

  // Shipping APIs
  calculateShipping: (method) =>
    `${API_BASE_URL}/orders/shipping-cost/${method}`,

  // Payment APIs
  processPayment: `${API_BASE_URL}/payments/process`,
  verifyPayment: (paymentId) => `${API_BASE_URL}/payments/verify/${paymentId}`,

  // Contact APIs
  submitContactForm: `${API_BASE_URL}/contact/submit`, // Submit a contact form message
  getContactMessages: `${API_BASE_URL}/contact/messages`, // Retrieve all contact form messages

  // Subscription APIs
  subscribeUser: `${API_BASE_URL}/users/subscribe`, // Subscribe user to mailing list
};

export default API_BASE_URL;
