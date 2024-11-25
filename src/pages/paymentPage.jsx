// sceed_frontend/src/pages/paymentPage.jsx
// Updated PaymentPage.jsx
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Import new components
import DeliveryAddressForm from "../components/paymentComponents/DeliveryAddressForm";
import ShippingOptions from "../components/paymentComponents/ShippingOptions";
import PaymentMethodSelection from "../components/paymentComponents/PaymentMethodSelector";
import OrderSummary from "../components/paymentComponents/OrderSummary";

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
      name: "M-Pesa",
      icons: [MpesaIcon],
      countries: ["all"],
      description: "Pay with M-Pesa mobile money",
      processorFields: ["phone"],
    },
    // TIGO: {
    //   id: "TIGO",
    //   // name: "Tigo Pesa",
    //   icons: [TigoPesaIcon],
    //   countries: ["TZ"],
    //   description: "Pay with Tigo Pesa (Tanzania)",
    //   processorFields: ["phone"],
    // },
    // AIRTEL: {
    //   id: "AIRTEL",
    //   name: "Airtel Money",
    //   icons: [AirtelMoneyIcon],
    //   countries: ["KE", "TZ", "UG", "RW"],
    //   description: "Pay with Airtel Money",
    //   processorFields: ["phone"],
    // },
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
    // PAYPAL: {
    //   id: "PAYPAL",
    //   name: "PayPal",
    //   icons: [PayPalIcon],
    //   countries: ["all"],
    //   description: "Pay securely with PayPal",
    //   processorFields: [],
    // },
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
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [tax, setTax] = useState(0);
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

  // handlePayment function to process payment and create order///////////
  const handlePayment = async () => {
    // Validation checks
    if (
      !deliveryDetails.fullName ||
      !deliveryDetails.country ||
      !deliveryDetails.phone ||
      !deliveryDetails.address
    ) {
      setError("Please fill in all required delivery details");
      return;
    }

    if (!selectedShipping) {
      setError("Please select a shipping method");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    setProcessingPayment(true);
    setError(null);

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("You must be logged in to place an order");
        setProcessingPayment(false);
        return;
      }

      // Create order first
      const orderResponse = await axios.post(
        API_ENDPOINTS.createOrder,
        {
          userId: localStorage.getItem("userId"),
          deliveryDetails: {
            ...deliveryDetails,
            country:
              countries.find((c) => c.value === deliveryDetails.country)
                ?.label || deliveryDetails.country,
          },
          shippingMethod: selectedShipping,
          shippingCost,
          paymentMethod,
          cartItems,
          subtotal,
          tax,
          totalAmount: subtotal + shippingCost + tax,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      const totalAmount = subtotal + shippingCost + tax;

      if (paymentMethod === "MPESA") {
        // M-Pesa Payment Flow
        try {
          const mpesaResponse = await axios.post(
            API_ENDPOINTS.mpesaInitiate,
            {
              orderId: orderResponse.data.orderId,
              phoneNumber: paymentFields.phoneNumber,
              amount: totalAmount,
              description: `Payment for Order #${orderResponse.data.orderId}`,
              accountReference: `ORDER${orderResponse.data.orderId}`,
            },
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );

          if (mpesaResponse.data.success) {
            // Show STK push notification message
            toast.info(
              "Please check your phone for the M-Pesa payment prompt",
              {
                position: "top-center",
                autoClose: false,
              }
            );

            // Start checking payment status
            let attempts = 0;
            const maxAttempts = 12; // 1 minute (5 seconds * 12)

            const checkPaymentStatus = async () => {
              try {
                const statusResponse = await axios.get(
                  API_ENDPOINTS.mpesaVerify(
                    mpesaResponse.data.checkoutRequestId
                  )
                );

                if (statusResponse.data.success) {
                  toast.success("Payment successful!");
                  navigate("/payment/success", {
                    state: { orderId: orderResponse.data.orderId },
                  });
                  return;
                }

                if (statusResponse.data.failed) {
                  toast.error("Payment failed. Please try again.");
                  setProcessingPayment(false);
                  return;
                }

                attempts++;
                if (attempts < maxAttempts) {
                  setTimeout(checkPaymentStatus, 5000); // Check every 5 seconds
                } else {
                  toast.warning(
                    "Payment status unclear. If amount was deducted, please contact support.",
                    { autoClose: false }
                  );
                  setProcessingPayment(false);
                }
              } catch (error) {
                console.error("Payment status check failed:", error);
                toast.error("Error verifying payment status");
                setProcessingPayment(false);
              }
            };

            // Start the payment status check
            checkPaymentStatus();
          } else {
            throw new Error(
              mpesaResponse.data.message || "Failed to initiate M-Pesa payment"
            );
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "M-Pesa payment failed");
          setProcessingPayment(false);
        }
      } else {
        // Dummy code for other payment methods (DPO Integration placeholder)
        try {
          // This will be replaced with actual DPO integration
          const dpoResponse = await axios.post(
            API_ENDPOINTS.processPayment,
            {
              orderId: orderResponse.data.orderId,
              paymentMethod,
              amount: totalAmount,
              currency: "KES",
              customerDetails: {
                firstName: deliveryDetails.fullName.split(" ")[0],
                lastName: deliveryDetails.fullName
                  .split(" ")
                  .slice(1)
                  .join(" "),
                email: "customer@example.com", // You'll need to add email to deliveryDetails
                phone: deliveryDetails.phone,
                country: deliveryDetails.country,
              },
              returnUrl: `${window.location.origin}/payment/verify`,
              cancelUrl: `${window.location.origin}/payment/cancel`,
            },
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );

          // Redirect to DPO payment page
          if (dpoResponse.data.paymentUrl) {
            window.location.href = dpoResponse.data.paymentUrl;
          } else {
            throw new Error("Invalid payment gateway response");
          }
        } catch (error) {
          toast.error("Payment gateway error. Please try again.");
          setProcessingPayment(false);
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error processing payment. Please try again.";
      toast.error(errorMessage);
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
      <ToastContainer position="top-center" />
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <DeliveryAddressForm
                  deliveryDetails={deliveryDetails}
                  countries={countries}
                  cities={cities}
                  handleInputChange={handleInputChange}
                  setDeliveryDetails={setDeliveryDetails}
                />

                <ShippingOptions
                  selectedShipping={selectedShipping}
                  handleShippingSelection={handleShippingSelection}
                  shippingCost={shippingCost}
                />

                <PaymentMethodSelection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  setPaymentFields={setPaymentFields}
                  getAvailablePaymentMethods={getAvailablePaymentMethods}
                />
              </div>

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

              <button
                className="mt-2 w-full text-gray-600 flex items-center justify-center space-x-2 hover:text-gray-800 border"
                onClick={() => navigate(-1)}>
                <span>
                  <ChevronLeft />
                </span>
                <span>Go Back & Continue Shopping</span>
              </button>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                selectedShipping={selectedShipping}
                shippingCost={shippingCost}
                tax={tax}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
