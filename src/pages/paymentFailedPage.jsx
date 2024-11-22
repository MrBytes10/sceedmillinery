// sceed_frontend/src/pages/PaymentFailedPage.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const PaymentFailedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <AlertCircle className="text-red-500" size={72} />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        {orderId && (
          <p className="text-gray-600 mb-4">
            Order #{orderId} payment was unsuccessful
          </p>
        )}
        <p className="text-gray-500 mb-6">
          Don't worry! You can:
          <ul className="list-disc list-inside text-left mt-2">
            <li>Check your mobile money balance</li>
            <li>Ensure you have sufficient funds</li>
            <li>Verify your M-Pesa PIN</li>
          </ul>
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
            Back to Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
