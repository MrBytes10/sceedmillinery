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

  const [deliveryAddress, setDeliveryAddress] = useState({
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
    setDeliveryAddress((prev) => ({
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
        setShippingCost(0.0);
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
    if (!deliveryAddress.country) return Object.values(PAYMENT_METHODS);

    return Object.values(PAYMENT_METHODS).filter(
      (method) =>
        method.countries.includes("all") ||
        method.countries.includes(deliveryAddress.country)
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
      if (!deliveryAddress.country) {
        setCities([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.worldbank.org/v2/country/${deliveryAddress.country}/city?format=json`
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
  }, [deliveryAddress.country]);

  ////////// HANDLEPayment function to process payment and create order///////////
  const handlePayment = async () => {
    // Validation checks
    if (
      !deliveryAddress.fullName ||
      !deliveryAddress.country ||
      !deliveryAddress.phone ||
      !deliveryAddress.address
    ) {
      // toError("Please fill in all required delivery details");
      toast.error("Please fill in all required delivery details");
      return;
    }

    if (!selectedShipping) {
      // setError("Please select a shipping method");
      toast.error("Please select a shipping method");
      return;
    }

    if (!paymentMethod) {
      // setError("Please select a payment method");
      toast.error("Please select a payment method");
      return;
    }

    setProcessingPayment(true);
    setError(null);
    // Create the processing toast and store its ID
    const toastId = toast.loading("Processing your order...");

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        toast.update(toastId, {
          render: "You must be logged in to place an order",
          type: "error",
          isLoading: false,
          autoClose: 7000,
        });
        setProcessingPayment(false);
        return;
      }

      // REPLACE everything from here...TO CHECK IF ORDER IS BEING CREATED
      // Create order first
      try {
        // Show processing toast
        toast.update(toastId, {
          render: "Creating your order...",
          type: "info",
          isLoading: true,
        });

        // Prepare order payload
        const orderPayload = {
          userId: localStorage.getItem("userId") || null, //userId should be a string to avoid errors in backend
          orderNumber: null, // Will be generated by backend--added
          deliveryAddress: {
            fullName: deliveryAddress.fullName,
            country:
              countries.find((c) => c.value === deliveryAddress.country)
                ?.label || deliveryAddress.country,
            city: deliveryAddress.city,
            phone: deliveryAddress.phone,
            address: deliveryAddress.address,
            apartment: deliveryAddress.apartment,
            additionalInfo: deliveryAddress.additionalInfo,
          },
          shippingMethod: selectedShipping,
          shippingCost,
          paymentMethod,
          cartItems: cartItems.map((item) => ({
            productId: item.productId || item.id,
            quantity: item.quantity,
            color: item.color,
            price: item.price, // Make sure to include price--added
          })),
          subTotal: subtotal,
          tax,
          totalAmount: subtotal + shippingCost + tax,
          orderStatus: "Pending", // Include initial status/added
        };
        // trying validation before sending order payload
        if (!orderPayload.userId) {
          toast.error("User ID not found. Please log in again.");
          setProcessingPayment(false);
          return;
        }
        // Added logging to help debug
        console.log("User ID:", orderPayload.userId);
        console.log("Auth Token:", authToken);
        console.log("Sending order payload:", orderPayload);

        // Create order
        const orderResponse = await axios.post(
          API_ENDPOINTS.createOrder,
          orderPayload,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            timeout: 300000, // Increased timeout to 5 minutes/1 minute=60000ms
          }
        );

        console.log("Order creation response:", orderResponse.data);

        // Check if order was created successfully
        if (!orderResponse.data || !orderResponse.data.orderId) {
          throw new Error("Invalid order response from server");
        }

        // Update toast with success message
        toast.update(toastId, {
          render: "Order created successfully, processing payment...",
          type: "success",
          isLoading: true,
        });

        const totalAmount = subtotal + shippingCost + tax;

        ////////upto here for checking if order is being created////////////////////////

        if (paymentMethod === "MPESA") {
          // M-Pesa Payment Flow
          try {
            // Add console.log to see what we're sending
            const mpesaPayload = {
              orderId: orderResponse.data.orderId || 0, // Fallback to 0 if orderId is undefined
              phoneNumber: paymentFields.phoneNumber,
              amount: totalAmount,
              description: `Payment for Order #${
                orderResponse.data.orderId || "New"
              }`,
              accountReference: `SCEED-ORDER${
                orderResponse.data.orderId || "SceedTEST001"
              }`,
            };
            console.log("M-Pesa Payload:", mpesaPayload);

            // Initiate M-Pesa Payment
            const mpesaResponse = await axios.post(
              API_ENDPOINTS.mpesaInitiate,
              mpesaPayload,
              // {
              //   orderId: orderResponse.data.orderId || 0,
              //   phoneNumber: paymentFields.phoneNumber,
              //   amount: totalAmount,
              //   description: `Payment for Order #${orderResponse.data.orderId}`,
              //   accountReference: `SCEED-ORDER${orderResponse.data.orderId}`,
              // },
              {
                headers: {
                  "Content-Type": "application/json",
                  // Only include Authorization if your endpoint requires it
                  // Authorization: `Bearer ${authToken}`
                },
              }
            );
            console.log("M-Pesa Response:", mpesaResponse.data);

            // if (mpesaResponse.data.success) {
            //   // Show STK push notification message
            //   toast.info(
            //     "Please check your phone for the M-Pesa payment prompt",
            //     {
            //       position: "top-center",
            //       autoClose: false,
            //     }
            //   );
            if (mpesaResponse.data.success) {
              toast.update(toastId, {
                render: "Please check your phone for the M-Pesa payment prompt",
                type: "info",
                isLoading: false,
                autoClose: false,
              });

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
                mpesaResponse.data.message ||
                  "Failed to initiate M-Pesa payment"
              );
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "M-Pesa payment failed"
            );
            setProcessingPayment(false);
          }
        } else {
          // Dummy code for other payment methods (DPO Integration placeholder)
          try {
            // This will be replaced with actual DPO integration
            const dpoResponse = await axios.post(
              API_ENDPOINTS.processDPOPayment,
              {
                orderId: orderResponse.data.orderId,
                paymentMethod,
                amount: totalAmount,
                currency: "KES",
                customerDetails: {
                  firstName: deliveryAddress.fullName.split(" ")[0],
                  lastName: deliveryAddress.fullName
                    .split(" ")
                    .slice(1)
                    .join(" "),
                  email: "customer@example.com", // You'll need to add email to deliveryAddress
                  phone: deliveryAddress.phone,
                  country: deliveryAddress.country,
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
          } catch (dpoError) {
            console.error("DPO Error:", dpoError);
            toast.error("Payment gateway error. Please try again.");
            setProcessingPayment(false);
          }
        }
      } catch (orderError) {
        console.error("Order Creation Error:", orderError);
        toast.update(toastId, {
          render:
            orderError.response?.data?.message || "Failed to create order",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        setProcessingPayment(false);
      }
    } catch (mainError) {
      console.error("Main Error:", mainError);
      toast.update(toastId, {
        render: "An unexpected error occurred",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setProcessingPayment(false);
    }
  }; // End of handlePayment
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
      {/* Placing the ToastContainer at the page level */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <DeliveryAddressForm
                  deliveryAddress={deliveryAddress}
                  countries={countries}
                  cities={cities}
                  handleInputChange={handleInputChange}
                  setDeliveryAddress={setDeliveryAddress}
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
              {/* //button to test mpesa payment // Add this button temporarily for
              testing */}
              {/* <button
                onClick={async () => {
                  try {
                    const testPayload = {
                      orderId: 0,
                      phoneNumber: "254712345678", // Use your test number
                      amount: 1,
                      description: "Test Payment",
                      accountReference: "TEST001",
                    };

                    console.log("Testing M-Pesa with payload:", testPayload);

                    const response = await axios.post(
                      API_ENDPOINTS.mpesaInitiate,
                      testPayload,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    console.log("Test response:", response.data);
                    toast.success("M-Pesa test successful!");
                  } catch (error) {
                    console.error("Test error:", error.response || error);
                    toast.error("M-Pesa test failed!");
                  }
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Test M-Pesa Integration
              </button> */}
              {error && (
                <div className="mt-4 bg-red-100 text-red-500 p-2 rounded">
                  {error}
                </div>
              )}
              {/* Test toast */}
              {/* // Add these test buttons right after your error display and
              before the "Go Back" button */}
              {/* <div className="mt-4 space-y-2"> */}
              {/* Test buttons for different toast types */}
              {/* <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => toast.success("This is a success message!")}>
                    Test Success Toast
                  </button>

                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => toast.error("This is an error message!")}>
                    Test Error Toast
                  </button>

                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => toast.info("This is an info message!")}>
                    Test Info Toast
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                    onClick={() => toast.warning("This is a warning message!")}>
                    Test Warning Toast
                  </button>

                  <button
                    className="px-4 py-2 bg-purple-500 text-white rounded"
                    onClick={() =>
                      toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 2000)),
                        {
                          pending: "Promise is pending...",
                          success: "Promise resolved 👌",
                          error: "Promise rejected 🤯",
                        }
                      )
                    }>
                    Test Promise Toast
                  </button>
                </div>
              </div> */}
              {/* Your existing Go Back button */}
              {/* Go back button */}
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
