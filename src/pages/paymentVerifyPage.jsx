// src/pages/PaymentVerifyPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentVerifyPage = () => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get the transaction token from URL parameters
        const params = new URLSearchParams(location.search);
        const transToken = params.get("TransID") || params.get("token");

        if (!transToken) {
          throw new Error("No transaction token found");
        }

        // Verify the payment
        const response = await axios.get(
          API_ENDPOINTS.verifyPayment(transToken)
        );

        if (
          response.data.status === "completed" ||
          response.data.status === "success"
        ) {
          setStatus("success");
          setOrderDetails(response.data.orderDetails);
        } else {
          throw new Error(
            response.data.message || "Payment verification failed"
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("error");
        setError(
          error.response?.data?.message ||
            error.message ||
            "Payment verification failed"
        );
      }
    };

    verifyPayment();
  }, [location]);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          {status === "loading" && (
            <div className="text-center">
              <Loader className="w-16 h-16 mx-auto mb-4 text-indigo-600 animate-spin" />
              <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
              <p className="text-gray-600">
                Please wait while we confirm your payment...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-semibold mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
              {orderDetails && (
                <div className="text-left bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Order Details:</h3>
                  <p>Order ID: {orderDetails.orderId}</p>
                  <p>Amount: ${orderDetails.amount}</p>
                  <p>
                    Date: {new Date(orderDetails.date).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
                  View Order
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2">Payment Failed</h2>
              <p className="text-gray-600 mb-4">{error}</p>
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentVerifyPage;
