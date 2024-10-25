// src/config/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://localhost:7295/api";

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  product: (id) => `${API_BASE_URL}/products/${id}`,
  relatedProducts: (id) => `${API_BASE_URL}/products/related/${id}`,
};

export default API_BASE_URL;
