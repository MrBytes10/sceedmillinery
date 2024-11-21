// src/pages/PaymentCancelPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Payment Cancelled</h2>
          <p className="text-gray-600 mb-6">
            Your payment has been cancelled. No charges were made.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
              Try Again
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors">
              Return to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentCancelPage;
