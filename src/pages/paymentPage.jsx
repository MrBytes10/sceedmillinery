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
import { ChevronLeft } from "lucide-react";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, subtotal } = location.state;
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
  const [discountedTotal, setDiscountedTotal] = useState(subtotal);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null); //for shipping cost
  const [tax, setTax] = useState(5.0); //tax rate

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

    if (deliveryDetails.country) {
      fetchCities();
    } else {
      setCities([]);
    }
  }, [deliveryDetails.country]);

  //shipping cost function to fetch from the backend

  useEffect(() => {
    const calculateShippingCost = async () => {
      try {
        const response = await axios.post("/api/checkout/shipping-cost", {
          shippingMethod: selectedShipping,
        });
        setShippingCost(response.data.shippingCost);
      } catch (error) {
        console.error("Error calculating shipping cost:", error);
        setShippingCost(0);
      }
    };

    if (selectedShipping) {
      calculateShippingCost();
    }
  }, [selectedShipping]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShippingSelection = (option) => {
    setSelectedShipping(option);
  }; // to handle the shipping selection

  const handleDiscountApply = async () => {
    try {
      const response = await axios.post("/api/checkout/apply-discount", {
        total: discountedTotal,
        discountCode: "SUMMER2023",
      });
      setDiscountedTotal(response.data.discountedTotal);
    } catch (error) {
      console.error("Error applying discount:", error);
      setError("Error applying discount. Please try again.");
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/checkout/payment", {
        userId: localStorage.getItem("userId"),
        deliveryAddress: deliveryDetails,
        shippingMethod: selectedShipping,
        paymentMethod: paymentMethod,
        total: discountedTotal,
      });
      setIsLoading(false);
      navigate("/order-confirmation", {
        state: {
          orderId: response.data.orderId,
          total: response.data.total,
          createdAt: response.data.createdAt,
        },
      });
    } catch (error) {
      setIsLoading(false);
      setError("Error processing payment. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-center text-2xl font-medium mb-4">
            Place your Order
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-medium mb-6 border-b pb-2">
                  Delivery Address
                </h2>

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
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Choose Payment Method
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    All Transactions are Secure and Encrypted
                  </p>

                  <div className="grid grid-cols-4 gap-4">
                    <button
                      className="w-full h-full border rounded-md hover:border-gray-400 transition-colors flex items-center justify-center"
                      onClick={() => setPaymentMethod("paypal")}>
                      <PayPalIcon className="w-full h-full" alt="PayPal" />
                    </button>
                    {/* <button
                      className="w-full h-full border rounded-md hover:border-gray-400 transition-colors flex items-center justify-center"
                      onClick={() => setPaymentMethod("visa")}
                    >
                      <VisaIcon className="w-full h-full" alt="Visa" />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
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

                <button
                  className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handlePayment}
                  disabled={isLoading}>
                  {isLoading ? "Processing..." : "Place Order"}
                </button>
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
