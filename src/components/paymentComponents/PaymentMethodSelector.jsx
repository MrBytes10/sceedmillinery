// sceed_frontend/src/components/paymentComponents/PaymentMethodSelector.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentMethodSelector = ({
  paymentMethod,
  setPaymentMethod,
  getAvailablePaymentMethods,
  setPaymentFields,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateMpesaPhone = (phone) => {
    // Kenya phone number validation
    const kenyanPhoneRegex =
      /^(254|0)(?:7(?:0[0-9]|1[0-2]|3[0-9]|5[0-6]|7[0-7]|8[0-9]|9[0-9])|1(?:1[0-5])|2(?:0[0-9]|1[0-2])|[14](?:0[0-9]|1[0-2])[0-9]{6})$/;
    return kenyanPhoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhoneNumber(input);

    // Validate phone for M-Pesa
    if (paymentMethod === "MPESA") {
      const isValid = validateMpesaPhone(input);
      setPhoneError(isValid ? "" : "Invalid Kenyan phone number");

      // Only set payment fields if valid
      if (isValid) {
        setPaymentFields((prev) => ({
          ...prev,
          phoneNumber: input.startsWith("0")
            ? "254" + input.substring(1)
            : input,
        }));
      }
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Choose Payment Method</h3>
      <p className="text-sm text-gray-500 mb-4">
        All Transactions are Secure and Encrypted
      </p>

      <div className="space-y-4">
        {getAvailablePaymentMethods().map((method) => (
          <div key={method.id}>
            <button
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full p-4 border rounded-lg hover:border-gray-400 transition-colors ${
                paymentMethod === method.id
                  ? "border-indigo-600 bg-indigo-50"
                  : ""
              }`}>
              {/* Existing payment method button content */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    {method.icons.map((Icon, index) => (
                      <Icon
                        key={index}
                        className="w-10 h-10"
                        alt={method.name}
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium">{method.name}</h4>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                      paymentMethod === method.id
                        ? "border-indigo-600"
                        : "border-gray-300"
                    }`}>
                    {paymentMethod === method.id && (
                      <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            </button>

            {/* M-Pesa Phone Number Input */}
            {paymentMethod === method.id && method.id === "MPESA" && (
              <div className="mt-4 pl-16">
                <label className="block text-sm mb-1">
                  M-Pesa Phone Number (Kenyan Number)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  className={`w-full rounded-md p-2 border-2 ${
                    phoneError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-600"
                  } focus:outline-none focus:ring-2`}
                  placeholder="e.g., 0712345678 or 254712345678"
                  onChange={handlePhoneChange}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
