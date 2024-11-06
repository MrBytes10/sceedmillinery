// PaymentPage.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [deliveryDetails, setDeliveryDetails] = React.useState({
    fullName: "",
    country: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    additionalInfo: "",
    saveInfo: false,
  });
  const navigate = useNavigate();

  const [selectedShipping, setSelectedShipping] = React.useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-1 py-4 pb-0">
          <h1 className=" justify justify-center text-center text-2xl font-medium mb-2">
            Place your Order
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <h2 className="text-xl font-medium mb-6 border-2 ">
                  Delivery Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="block text-sm mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={deliveryDetails.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-black focus:outline-double focus:ring-4 focus:ring-black"
                      placeholder="John Doe Sam"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm mb-1">Country/Region</label>
                    <input
                      type="text"
                      name="country"
                      value={deliveryDetails.country}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-black focus:outline-double focus:ring-4 focus:ring-black"
                      placeholder="Kenya"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryDetails.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-black focus:outline-double focus:ring-4 focus:ring-black"
                      placeholder="+254704 840 443"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="block text-sm mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={deliveryDetails.address}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-black focus:outline-double focus:ring-4 focus:ring-black"
                      placeholder="TRM Drive, Roysambu"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={deliveryDetails.apartment}
                      onChange={handleInputChange}
                      className="w-full  rounded-md p-2 border-2 border-black focus:outline-double focus:ring-4 focus:ring-black"
                      placeholder="Pinnacle Apartment"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryDetails.city}
                      onChange={handleInputChange}
                      className="w-full rounded-md p-2 border-2 border-black focus:outline-double focus:ring-4 focus:ring-black"
                      placeholder="Nairobi"
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
                    className="w-full rounded-md p-2 border-2 border-black focus:outline-double focus:ring-4 focus:ring-black"
                    rows="3"
                    placeholder="Anything you would like us to know about the Delivery?"
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
                    Save information for Next Purchases
                  </label>
                </div>

                {/* Shipping Options */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Shipping Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 rounded-md border-2 border-black focus:outline-double focus:ring-4 focus:ring-black">
                      <input
                        type="radio"
                        name="shipping"
                        value="self-pickup"
                        checked={selectedShipping === "self-pickup"}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="mr-3"
                      />
                      <span>Self Pick-up</span>
                      <span className="ml-auto">Free</span>
                    </label>

                    <label className="flex items-center p-3 rounded-md border-2 border-black focus:outline-double focus:ring-4 focus:ring-black">
                      <input
                        type="radio"
                        name="shipping"
                        value="nairobi"
                        checked={selectedShipping === "nairobi"}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="mr-3"
                      />
                      <span>Delivery within Nairobi (1 business day)</span>
                      <span className="ml-auto">KES XX,000</span>
                    </label>

                    <label className="flex items-center p-3 rounded-md border-2 border-black focus:outline-double focus:ring-4 focus:ring-black">
                      <input
                        type="radio"
                        name="shipping"
                        value="outside-nairobi"
                        checked={selectedShipping === "outside-nairobi"}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="mr-3"
                      />
                      <span>Delivery outside Nairobi (1-2 business days)</span>
                      <span className="ml-auto">KES XX,000</span>
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
                    {/* // comment out the payment methods not implemented at the moment */}
                    {/* <button className="p-4 border rounded-md hover:border-gray-400 transition-colors">
                      <img
                        src="/path-to-mpesa-logo"
                        alt="M-Pesa"
                        className="h-6 mx-auto"
                      />
                    </button>
                    <button className="p-4 border rounded-md hover:border-gray-400 transition-colors">
                      <img
                        src="/path-to-visa-logo"
                        alt="Visa"
                        className="h-6 mx-auto"
                      />
                    </button>
                    <button className="p-4 border rounded-md hover:border-gray-400 transition-colors">
                      <img
                        src="/path-to-gpay-logo"
                        alt="Google Pay"
                        className="h-6 mx-auto"
                      />
                    </button> */}
                    <button className="p-4 border rounded-md hover:border-gray-400 transition-colors">
                      <img
                        src="/path-to-paypal-logo"
                        alt="PayPal"
                        className="h-6 mx-auto"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <h2 className="text-xl font-medium mb-4 border-2">
                  Order Summary
                </h2>

                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-md">
                    <img
                      src="/path-to-product-image"
                      alt="Fascinator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Fascinator</h3>
                    <p className="text-sm text-gray-500">Colour XXXXX</p>
                  </div>
                  <div className="ml-auto">
                    <span>KES XX,000</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Gift Card"
                      className="flex-grow border rounded-l-md p-2"
                    />
                    <button className="bg-gray-500 text-white px-4 rounded-r-md hover:bg-gray-600 transition-colors">
                      Apply
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>KES XX,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center">
                        Shipping
                        <span
                          className="ml-1 text-gray-500 cursor-help"
                          title="Shipping costs vary by location">
                          ⓘ
                        </span>
                      </span>
                      <span className="text-green-600">FREE</span>
                    </div>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Total</span>
                      <div className="text-right">
                        <span className="block font-medium">KES XX,000</span>
                        <span className="text-sm text-gray-500">
                          Including KES 0.00 in taxes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="mt-2 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => {
                  // Handle payment submission
                }}>
                Pay Now
              </button>

              <button
                className="mt-2 w-full text-gray-600 flex items-center justify-center space-x-2 hover:text-gray-800"
                onClick={() => navigate(-1)}>
                <span>←</span>
                <span>Go Back & Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
