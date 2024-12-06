// sceed_frontend/src/config/api.js

const API_BASE_URL = "https://localhost:7295/api"; // Should be either "https://sceedbackend.pensoft.co.ke/api"; OR this for local "https://localhost:7295/api";
// TODO: Change the API_BASE_URL to the correct one when deploying
export const API_ENDPOINTS = {
  // Product APIs ///////////////////////////////
  getProducts: `${API_BASE_URL}/products`, // Retrieve all products, optionally with filters

  getProduct: (id) => `${API_BASE_URL}/products/${id}`, // Retrieve a single product by ID

  getRelatedProducts: (id) => `${API_BASE_URL}/products/related/${id}`, // Retrieve related products by product ID

  createProduct: `${API_BASE_URL}/products/CreateProduct`, // Create a new product

  deleteProduct: (id) => `${API_BASE_URL}/products/delete/${id}`, // Delete a product by ID/changed to POST method

  updateProduct: (id) => `${API_BASE_URL}/products/update/${id}`, // Update an existing product by ID/ changed to POST method

  // Filter APIs ///////////////////////////////
  getCategories: `${API_BASE_URL}/products/categories`, // Get all available product categories
  getColors: `${API_BASE_URL}/products/colors`, // Get all available product colors

  // Stock APIs
  getStock: (id) => `${API_BASE_URL}/products/${id}/stock`,
  updateStock: (id) => `${API_BASE_URL}/products/${id}/stock`, // Update stock quantity for a product by ID

  // User APIs ///////////////////////////////
  registerUser: `${API_BASE_URL}/users/register`, // Register a new user
  loginUser: `${API_BASE_URL}/users/login`, // Log in an existing user
  googleLoginUser: `${API_BASE_URL}/users/google-login`, // Log in with Google
  getUserProfile: `${API_BASE_URL}/users/profile`, // Get user profile details
  //updateUserProfile: `${API_BASE_URL}/users/profile`, // Update user profile details
  updateUserProfile: `${API_BASE_URL}/users/profile/update`, // Changed to match new POST endpoint

  // Cart APIs/Endpoints ///////////////////////////////
  cart: `${API_BASE_URL}/cart`, // Retrieve cart items
  addToCart: `${API_BASE_URL}/cart`, // Add item to cart
  //updateCartItem: (itemId) => `${API_BASE_URL}/cart/${itemId}`, // Update item quantity in cart
  //removeFromCart: (itemId) => `${API_BASE_URL}/cart/${itemId}`, // Remove item from cart
  mergeCart: `${API_BASE_URL}/cart/merge`, // Merge anonymous cart with user cart
  updateCartItem: `${API_BASE_URL}/cart/update`, // Changed: now uses POST to update
  removeFromCart: `${API_BASE_URL}/cart/remove`, // Changed: now uses POST to remove
  clearCart: `${API_BASE_URL}/cart/clear`, // Clear all items from cart

  // Order APIs ///////////////////////////////
  orders: `${API_BASE_URL}/orders`, // Base orders endpoint
  createOrder: `${API_BASE_URL}/orders/create`, // Create a new order
  getOrder: (id) => `${API_BASE_URL}/orders/${id}`, // Get single order
  getUserOrders: (userId) => `${API_BASE_URL}/orders/user/${userId}`, // Get user's orders
  updateOrderStatus: (id) => `${API_BASE_URL}/orders/${id}/update-status`, // Changed from status to update-status // Update order status
  cancelOrder: (id) => `${API_BASE_URL}/orders/${id}/cancel`, // Cancel order
  getOrderTracking: (id) => `${API_BASE_URL}/orders/${id}/tracking`, // Get order tracking info

  // Order Payment Status
  getOrderPaymentStatus: (id) => `${API_BASE_URL}/orders/${id}/payment-status`, // Get payment status
  updateOrderPaymentStatus: (id) =>
    `${API_BASE_URL}/orders/${id}/payment-status`, // Update payment status

  // Admin Order Management
  getAllOrders: `${API_BASE_URL}/orders/all`, // Admin: Get all orders
  getOrdersByStatus: (status) => `${API_BASE_URL}/orders/status/${status}`, // Admin: Filter orders by status
  getOrdersByDate: `${API_BASE_URL}/orders/by-date`, // Admin: Get orders by date range

  // Order Analytics
  getOrderStats: `${API_BASE_URL}/orders/stats`, // Get order statistics
  getOrderAnalytics: `${API_BASE_URL}/orders/analytics`, // Get detailed order analytics

  // Shipping APIs ///////////////////////////////
  calculateShipping: (method) =>
    `${API_BASE_URL}/orders/shipping-cost/${method}`,

  // M-Pesa Payment APIs ///////////////////////////////
  mpesaInitiate: `${API_BASE_URL}/Mpesa/initiate`, // Initiate STK Push
  mpesaCallback: `${API_BASE_URL}/Mpesa/callback`, // M-Pesa callback URL
  mpesaVerify: (checkoutRequestId) =>
    `${API_BASE_URL}/Mpesa/verify/${checkoutRequestId}`, // Verify M-Pesa transaction
  //mpesaStatus: `${API_BASE_URL}/Mpesa/status`,

  // DPOPayment APIs ///////////////////////////////
  processDPOPayment: `${API_BASE_URL}/payment/process`, // Process a new payment
  verifyDPOPayment: (transToken) =>
    `${API_BASE_URL}/payment/verify/${transToken}`, // Verify payment status
  DPOpaymentWebhook: `${API_BASE_URL}/payment/webhook`, // Handle payment webhooks from DPO

  // Contact APIs ///////////////////////////////
  submitContactForm: `${API_BASE_URL}/contact/submit`, // Submit a contact form message
  getContactMessages: `${API_BASE_URL}/contact/messages`, // Retrieve all contact form messages

  // Subscription APIs ///////////////////////////////
  subscribeUser: `${API_BASE_URL}/users/subscribe`, // Subscribe user to mailing list
};

export default API_BASE_URL;
