// // sceed_frontend/src/components/paymentComponents/PaymentMethodSelector.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import mpesaPhoneUtils from "../../utils/mpesaPhonUtils";

// const PaymentMethodSelector = ({
//   paymentMethod,
//   setPaymentMethod,
//   getAvailablePaymentMethods,
//   setPaymentFields,
// }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [phoneError, setPhoneError] = useState("");

//   // const validateMpesaPhone = (phone) => {
//   //   // Kenya phone number validation
//   //   const kenyanPhoneRegex =
//   //     /^(254|0)(?:7(?:0[0-9]|1[0-2]|3[0-9]|5[0-6]|7[0-7]|8[0-9]|9[0-9])|1(?:1[0-5])|2(?:0[0-9]|1[0-2])|[14](?:0[0-9]|1[0-2])[0-9]{6})$/;
//   //   return kenyanPhoneRegex.test(phone.replace(/\s/g, ""));
//   // };

//   const handlePhoneChange = (e) => {
//     const input = e.target.value;
//     setPhoneNumber(input);

//     // Validate phone for M-Pesa
//     if (paymentMethod === "MPESA") {
//       const isValid = mpesaPhoneUtils.isValidKenyanPhone(input);
//       setPhoneError(isValid ? "" : "Invalid Kenyan phone number");

//       // Only set payment fields if valid
//       if (isValid) {
//         const formattedNumber = mpesaPhoneUtils.formatToKenyanPhone(input);
//         setPaymentFields((prev) => ({
//           ...prev,
//           phoneNumber: formattedNumber,
//         }));
//       }
//     }
//   };

//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-medium mb-4">Choose Payment Method</h3>
//       <p className="text-sm text-gray-500 mb-4">
//         All Transactions are Secure and Encrypted
//       </p>

//       <div className="space-y-4">
//         {getAvailablePaymentMethods().map((method) => (
//           <div key={method.id}>
//             <button
//               onClick={() => setPaymentMethod(method.id)}
//               className={`w-full p-4 border rounded-lg hover:border-gray-400 transition-colors ${
//                 paymentMethod === method.id
//                   ? "border-indigo-600 bg-indigo-50"
//                   : ""
//               }`}>
//               {/* Existing payment method button content */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex space-x-2">
//                     {method.icons.map((Icon, index) => (
//                       <Icon
//                         key={index}
//                         className="w-10 h-10"
//                         alt={method.name}
//                       />
//                     ))}
//                   </div>
//                   <div className="text-left">
//                     <h4 className="font-medium">{method.name}</h4>
//                     <p className="text-sm text-gray-500">
//                       {method.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div
//                     className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
//                       paymentMethod === method.id
//                         ? "border-indigo-600"
//                         : "border-gray-300"
//                     }`}>
//                     {paymentMethod === method.id && (
//                       <div className="w-3 h-3 bg-indigo-600 rounded-full" />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </button>

//             {/* M-Pesa Phone Number Input */}
//             {paymentMethod === method.id && method.id === "MPESA" && (
//               <div className="mt-4 pl-16">
//                 <label className="block text-sm mb-1">
//                   M-Pesa Phone Number (Kenyan Number)
//                 </label>
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   className={`w-full rounded-md p-2 border-2 ${
//                     phoneError
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 focus:ring-indigo-600"
//                   } focus:outline-none focus:ring-2`}
//                   placeholder="e.g., 0712345678 or 254712345678"
//                   onChange={handlePhoneChange}
//                 />
//                 {phoneError && (
//                   <p className="text-red-500 text-xs mt-1">{phoneError}</p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PaymentMethodSelector;

import React, { useState } from "react";
import { Modal, Button } from "antd"; // Import Ant Design components
import axios from "axios";
import { toast } from "react-toastify";
import mpesaPhoneUtils from "../../utils/mpesaPhonUtils";

const PaymentMethodSelector = ({
  paymentMethod,
  setPaymentMethod,
  getAvailablePaymentMethods,
  setPaymentFields,
  totalAmount, // Add totalAmount as a prop
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method

  //const { cartItems, subtotal } = location.state;
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhoneNumber(input);

    // Validate phone for M-Pesa
    if (paymentMethod === "MPESA") {
      const isValid = mpesaPhoneUtils.isValidKenyanPhone(input);
      setPhoneError(isValid ? "" : "Invalid Kenyan phone number");

      // Only set payment fields if valid
      if (isValid) {
        const formattedNumber = mpesaPhoneUtils.formatToKenyanPhone(input);
        setPaymentFields((prev) => ({
          ...prev,
          phoneNumber: formattedNumber,
        }));
      }
    }
  };

  // Function to show modal
  const showPaymentInstructions = (method) => {
    setSelectedPaymentMethod(method);
    setIsModalVisible(true);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPaymentMethod(null);
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
              onClick={() => {
                if (
                  method.id === "BANK" ||
                  method.id === "MPESA" ||
                  method.id === "MTN"
                  // method.id === "CARD"
                ) {
                  showPaymentInstructions(method); // Show modal for selected payment method
                } else {
                  setPaymentMethod(method.id);
                }
              }}
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

      {/* Modal for Payment Instructions */}
      <Modal
        title={`Payment Instructions for ${selectedPaymentMethod?.name}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        className="bg-white rounded-lg shadow-lg">
        <div className="p-4">
          {selectedPaymentMethod?.id === "BANK" && (
            <div>
              <h4 className="font-semibold">Bank Transfer Details</h4>
              <p>Please make your payment to the following details:</p>
              <p>
                <strong>Bank Name:</strong> Ecobank
              </p>
              <p>
                <strong>Paybill Number:</strong> 700201
              </p>
              <p>
                <strong>Account Number:</strong> 7210000878
              </p>
              <p>
                <strong>Account Name:</strong> Faith
              </p>

              <p>
                <strong>Amount:</strong> USD {totalAmount}{" "}
                {/* Use totalAmount */}
              </p>
            </div>
          )}
          {selectedPaymentMethod?.id === "MPESA" && (
            <div>
              <h4 className="font-semibold">M-Pesa Payment Details</h4>
              <p>Please make your payment using the following details:</p>
              <p>
                <strong>Mpesa Number:</strong> +254721663525
              </p>
              <p>
                <strong>Mpesa Name:</strong> Linet
              </p>
              <p>
                <strong>Amount:</strong> USD {totalAmount}{" "}
                {/* Use totalAmount */}
              </p>
            </div>
          )}
          {selectedPaymentMethod?.id === "MTN" && (
            <div>
              <h4 className="font-semibold">MTN Payment Details</h4>
              <p>Please make your payment using the following details:</p>
              <p>
                <strong>Phone Number:</strong> +256787315801
              </p>
              <p>
                <strong>MTN Name:</strong> Faith
              </p>
              <p>
                <strong>Amount:</strong> USD {totalAmount}{" "}
                {/* Use totalAmount */}
              </p>
            </div>
          )}
          {/* {selectedPaymentMethod?.id === "CARD" && (
            <div>
              <h4 className="font-semibold">Card Payment Details</h4>
              <p>Please enter your card details to complete the payment:</p>
              <p><strong>Card Number:</strong> 1234 5678 9012 3456</p>
              <p><strong>Expiry Date:</strong> 12/23</p>
              <p><strong>CVV:</strong> 123</p>
            </div>
          )} */}
        </div>
      </Modal>
    </div>
  );
};

export default PaymentMethodSelector;
