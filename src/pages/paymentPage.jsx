// sceed_frontend/src/pages/paymentPage.jsx

import React, { useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { ReactComponent as PayPalIcon } from "../assets/icons/paypallogo.svg";
import { ReactComponent as VisaIcon } from "../assets/icons/visalogo.svg";
import { ReactComponent as MpesaIcon } from "../assets/icons/mpesalogo.svg";
import { ReactComponent as MasterCardIcon } from "../assets/icons/mastercardlogo.svg";
import { ReactComponent as BankIcon } from "../assets/icons/banklogo.svg";
import { ReactComponent as TigoPesaIcon } from "../assets/icons/tigopesalogo.svg";
import { ReactComponent as AirtelMoneyIcon } from "../assets/icons/airtelmoneylogo.svg";
import { ReactComponent as MTNIcon } from "../assets/icons/mtnlogo.svg";
import { ChevronLeft } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, subtotal } = location.state;

  // Define supported payment methods with their details
  const PAYMENT_METHODS = {
    CARD: {
      id: "CARD",
      name: "Credit/Debit Card",
      icons: [VisaIcon, MasterCardIcon],
      countries: ["all"],
      description: "Pay securely with your credit or debit card",
      processorFields: [],
    },
    MPESA: {
      id: "MPESA",
      // name: "M-Pesa",
      icons: [MpesaIcon],
      countries: ["KE"],
      description: "Pay with M-Pesa mobile money",
      processorFields: ["phone"],
    },
    TIGO: {
      id: "TIGO",
      // name: "Tigo Pesa",
      icons: [TigoPesaIcon],
      countries: ["TZ"],
      description: "Pay with Tigo Pesa (Tanzania)",
      processorFields: ["phone"],
    },
    AIRTEL: {
      id: "AIRTEL",
      name: "Airtel Money",
      icons: [AirtelMoneyIcon],
      countries: ["KE", "TZ", "UG", "RW"],
      description: "Pay with Airtel Money",
      processorFields: ["phone"],
    },
    MTN: {
      id: "MTN",
      name: "MTN Mobile Money",
      icons: [MTNIcon],
      countries: ["UG", "RW", "ZM"],
      description: "Pay with MTN Mobile Money",
      processorFields: ["phone"],
    },
    BANK: {
      id: "BANK",
      name: "Bank Transfer",
      icons: [BankIcon],
      countries: ["all"],
      description: "Pay directly from your bank account",
      processorFields: [],
    },
    PAYPAL: {
      id: "PAYPAL",
      name: "PayPal",
      icons: [PayPalIcon],
      countries: ["all"],
      description: "Pay securely with PayPal",
      processorFields: [],
    },
  };

  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    country: "",
    city: "",
    phone: "",
    address: "",
    apartment: "",
    additionalInfo: "",
    saveInfo: false,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [shippingCost, setShippingCost] = useState(100.0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [tax, setTax] = useState(5.0);
  const [error, setError] = useState(null);
  const [paymentFields, setPaymentFields] = useState({});

  // handleInputChange function to update delivery details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleShippingSelection function to update selected shipping method
  const handleShippingSelection = (method) => {
    setSelectedShipping(method);

    switch (method) {
      case "self-pickup":
        setShippingCost(0);
        break;
      case "fedx":
      case "dhl-express":
        setShippingCost(100.0);
        break;
      default:
        setShippingCost(0);
    }
  };

  // useEffect to verify payment on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transToken = params.get("TransToken");

    if (transToken) {
      verifyPayment(transToken);
    }
  }, []);

  const verifyPayment = async (transToken) => {
    try {
      const response = await axios.get(`/api/payment/verify/${transToken}`);
      if (response.data.status === "completed") {
        // Handle successful payment
        navigate("/payment/success");
      } else {
        // Handle failed payment
        setError("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setError("Payment verification failed");
    }
  };

  // Filter payment methods based on selected country
  const getAvailablePaymentMethods = () => {
    if (!deliveryDetails.country) return Object.values(PAYMENT_METHODS);

    return Object.values(PAYMENT_METHODS).filter(
      (method) =>
        method.countries.includes("all") ||
        method.countries.includes(deliveryDetails.country)
    );
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(
          response.data
            .map((country) => ({
              label: country.name.common,
              value: country.cca2,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!deliveryDetails.country) {
        setCities([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.worldbank.org/v2/country/${deliveryDetails.country}/city?format=json`
        );
        const cityOptions =
          response.data[1]?.map((city) => ({
            label: city.name,
            value: city.name,
          })) || [];
        setCities(cityOptions);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    };

    fetchCities();
  }, [deliveryDetails.country]);

  //handlePayment function to process payment ....
  const handlePayment = async () => {
    // Validate delivery details first
    if (
      !deliveryDetails.fullName ||
      !deliveryDetails.country ||
      !deliveryDetails.phone ||
      !deliveryDetails.address
    ) {
      setError("Please fill in all required delivery details first");
      return;
    }

    // Validate shipping method
    if (!selectedShipping) {
      setError("Please select a shipping method");
      return;
    }

    // Validate payment method
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    setProcessingPayment(true);
    setError(null);

    try {
      const authToken = localStorage.getItem("authToken");
      console.log("The auth Token is", authToken); // Log the auth token to the console for debugging

      if (!authToken) {
        setError("You must be logged in to place an order");
        setProcessingPayment(false);
        return;
      }
      // First create the order with auth token
      const orderResponse = await axios.post(API_ENDPOINTS.createOrder, {
        userId: localStorage.getItem("userId"),
        deliveryDetails: {
          ...deliveryDetails,
          country:
            countries.find((c) => c.value === deliveryDetails.country)?.label ||
            deliveryDetails.country,
        },
        shippingMethod: selectedShipping,
        shippingCost,
        paymentMethod,
        cartItems,
        subtotal,
        tax,
        totalAmount: subtotal + shippingCost + tax,
      });

      // Process payment through payment gateway
      const paymentResponse = await axios.post(
        API_ENDPOINTS.processPayment,
        {
          orderId: orderResponse.data.orderId,
          paymentMethod,
          amount: subtotal + shippingCost + tax,
          currency: "USD",
          customerDetails: {
            email: localStorage.getItem("userEmail"), // Make sure you have this stored
            firstName: deliveryDetails.fullName.split(" ")[0],
            lastName:
              deliveryDetails.fullName.split(" ").slice(1).join(" ") ||
              deliveryDetails.fullName.split(" ")[0],
            phone: deliveryDetails.phone,
            country: countries.find((c) => c.value === deliveryDetails.country)
              ?.label,
            city: deliveryDetails.city,
            address: deliveryDetails.address,
            ...paymentFields, // Additional fields specific to payment method (e.g., mobile money number)
          },
          returnUrl: `${window.location.origin}/payment/verify`, // Add this to your routes
          cancelUrl: `${window.location.origin}/payment/cancel`,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Order Response:", orderResponse.data); // Log the order response to the console for debugging

      // Handle the payment response
      if (paymentResponse.data.paymentUrl) {
        // For redirect-based payments (Card, PayPal)
        window.location.href = paymentResponse.data.paymentUrl;
      } else if (paymentResponse.data.paymentInstructions) {
        // For mobile money payments that need user action
        // You might want to show these instructions in a modal or redirect to a instructions page
        navigate("/payment/instructions", {
          state: {
            instructions: paymentResponse.data.paymentInstructions,
            orderId: orderResponse.data.orderId,
          },
        });
      } else {
        throw new Error("Invalid payment response");
      }
    } catch (error) {
      //console.error("Payment processing error:", error);
      console.error("Full error response:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      console.error("Error config:", error.config);
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Error processing payment. Please try again."
      );
      setProcessingPayment(false);
    }
  };

  //render payment methods function to display payment methods
  const renderPaymentMethods = () => (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Choose Payment Method</h3>
      <p className="text-sm text-gray-500 mb-4">
        All Transactions are Secure and Encrypted
      </p>

      <div className="space-y-4">
        {getAvailablePaymentMethods().map((method) => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`w-full p-4 border rounded-lg hover:border-gray-400 transition-colors ${
              paymentMethod === method.id
                ? "border-indigo-600 bg-indigo-50"
                : ""
            }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {method.icons.map((Icon, index) => (
                    <Icon key={index} className="w-10 h-10" alt={method.name} />
                  ))}
                </div>
                <div className="text-left">
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-500">{method.description}</p>
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

            {/* Additional fields for payment method if needed */}
            {paymentMethod === method.id &&
              method.processorFields.length > 0 && (
                <div className="mt-4 pl-16">
                  {method.processorFields.includes("phone") && (
                    <div>
                      <label className="block text-sm mb-1">
                        Mobile Money Number
                      </label>
                      <input
                        type="tel"
                        className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        placeholder="Enter your mobile money number"
                        onChange={(e) =>
                          setPaymentFields((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-4 shadow-md">
                {/* Delivery Address Section */}
                <h2 className="text-xl font-medium mb-6 border-b pb-2">
                  Delivery Address
                </h2>

                {/* ///////////////////////////////////////////////////////////////// /////////////////*/}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={deliveryDetails.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="John Doe"
                    />
                  </div>
                  {/*phone number*/}
                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryDetails.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="+123 456 789"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Add the country and city dropdowns */}
                  <div>
                    <label className="block text-sm mb-1">Country</label>
                    <Select
                      options={countries}
                      value={countries.find(
                        (country) => country.value === deliveryDetails.country
                      )}
                      onChange={(selectedOption) => {
                        setDeliveryDetails((prev) => ({
                          ...prev,
                          country: selectedOption?.value || "",
                          city: "",
                        }));
                      }}
                      placeholder="Select a country"
                      isClearable
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">City</label>
                    <CreatableSelect
                      options={cities}
                      value={
                        deliveryDetails.city
                          ? {
                              label: deliveryDetails.city,
                              value: deliveryDetails.city,
                            }
                          : null
                      }
                      onChange={(selectedOption) => {
                        setDeliveryDetails((prev) => ({
                          ...prev,
                          city: selectedOption?.value || "",
                        }));
                      }}
                      onCreateOption={(inputValue) => {
                        setDeliveryDetails((prev) => ({
                          ...prev,
                          city: inputValue,
                        }));
                      }}
                      placeholder="Select or type a city"
                      isClearable
                      className="w-full"
                      noOptionsMessage={() =>
                        deliveryDetails.country
                          ? "Type to add a new city"
                          : "Select a country first"
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={deliveryDetails.address}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={deliveryDetails.apartment}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="Apt 4B"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={deliveryDetails.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    rows="3"
                    placeholder="Any special instructions you would wish to share with us?"
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={deliveryDetails.saveInfo}
                      onChange={(e) =>
                        setDeliveryDetails((prev) => ({
                          ...prev,
                          saveInfo: e.target.checked,
                        }))
                      }
                      className="mr-2"
                    />
                    Save information for next purchases
                  </label>
                </div>

                {/* Shipping Options */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Shipping Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                      <input
                        type="radio"
                        name="shipping"
                        value="self-pickup"
                        checked={selectedShipping === "self-pickup"}
                        onChange={() => handleShippingSelection("self-pickup")}
                        className="mr-3"
                      />
                      <span>Self Pick-up</span>
                      <span className="ml-auto">Free</span>
                    </label>

                    <label className="flex items-center p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                      <input
                        type="radio"
                        name="shipping"
                        value="fedx"
                        checked={selectedShipping === "fedx"}
                        onChange={() => handleShippingSelection("fedx")}
                        className="mr-3"
                      />
                      <span>
                        FedEx International Shipping (5-10 business days)
                      </span>
                      <span className="ml-auto">
                        ${shippingCost.toFixed(2)}
                      </span>
                    </label>

                    <label className="flex items-center p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                      <input
                        type="radio"
                        name="shipping"
                        value="dhl-express"
                        checked={selectedShipping === "dhl-express"}
                        onChange={() => handleShippingSelection("dhl-express")}
                        className="mr-3"
                      />
                      <span>DHL Express (5-10 business days)</span>
                      <span className="ml-auto">
                        ${shippingCost.toFixed(2)}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Payment Methods */}
                {/* Payment Methods Section */}
                {renderPaymentMethods()}
              </div>

              {/* Submit Button */}
              <button
                className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handlePayment}
                disabled={processingPayment || !paymentMethod}>
                {processingPayment ? "Processing Payment..." : "Place Order"}
              </button>

              {error && (
                <div className="mt-4 bg-red-100 text-red-500 p-2 rounded">
                  {error}
                </div>
              )}
              {/*back button*/}
              <button
                className="mt-2 w-full text-gray-600 flex items-center justify-center space-x-2 hover:text-gray-800 border"
                onClick={() => navigate(-1)}>
                <span>
                  <ChevronLeft />
                </span>
                <span>Go Back & Continue Shopping</span>
              </button>
            </div>

            {/* Right column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-medium mb-4 border-b pb-2">
                  Order Summary
                </h2>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 mb-2">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}

                {/* DUMMY Tax and total calculation */}
                <div className="border-t pt-2">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="flex items-center">
                      Shipping
                      <span
                        className="ml-1 text-gray-500 cursor-help"
                        title="Shipping costs vary by location">
                        ⓘ
                      </span>
                    </span>
                    <span
                      className={
                        selectedShipping === "self-pickup"
                          ? "text-green-600"
                          : "text-gray-600"
                      }>
                      {selectedShipping === "self-pickup"
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="flex items-center">
                      Tax
                      <span
                        className="ml-1 text-gray-500 cursor-help"
                        title="Tax may vary by location">
                        ⓘ
                      </span>
                    </span>
                    <span className="text-gray-600">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total</span>
                    <div className="text-right">
                      <span className="block font-medium">
                        ${(subtotal + shippingCost + tax).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 bg-red-100 text-red-500 p-2 rounded">
                    {error}
                  </div>
                )}

                {/* Place Order Button */}
                {/* <button
                  className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handlePayment}
                  disabled={isLoading}>
                  {isLoading ? "Processing..." : "Place Order"}
                </button> */}
                {/*back button*/}
                {/* <button
                  className="mt-2 w-full text-gray-600 flex items-center justify-center space-x-2 hover:text-gray-800 border"
                  onClick={() => navigate(-1)}>
                  <span>
                    <ChevronLeft />
                  </span>
                  <span>Go Back & Continue Shopping</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
