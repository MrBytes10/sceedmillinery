import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentInstructionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const { instructions, orderId, checkoutRequestId } = location.state;

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`/api/payment/status/${orderId}`); //to replace this API endpoint
        if (response.data.status === "completed") {
          navigate("/payment/success");
        } else if (response.data.status === "failed") {
          navigate("/payment/failed");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    // Poll for payment status every 5 seconds
    const interval = setInterval(checkPaymentStatus, 5000);
    return () => clearInterval(interval);
  }, [orderId, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Instructions</h2>
        <p className="mb-4">{instructions}</p>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Waiting for payment confirmation...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstructionsPage;
