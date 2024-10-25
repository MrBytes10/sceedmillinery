// src/config/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5284/api";

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  product: (id) => `${API_BASE_URL}/products/${id}`,
  relatedProducts: (id) => `${API_BASE_URL}/products/related/${id}`,
};

export default API_BASE_URL;
