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
  const [totalAmount, setTotalAmount] = useState(0); // Add totalAmount state
  // Define supported payment methods with their details
  const PAYMENT_METHODS = {
    // CARD: {
    //   id: "CARD",
    //   name: "Credit/Debit Card",
    //   icons: [VisaIcon, MasterCardIcon],
    //   countries: ["all"],
    //   description: "Pay securely with your credit or debit card",
    //   processorFields: [],
    // },
    MPESA: {
      id: "MPESA",
      name: "M-Pesa",
      icons: [MpesaIcon],
      countries: ["all"],
      description: "Pay with M-Pesa mobile money",
      processorFields: ["phone"],
    },
    MTN: {
      id: "MTN",
      name: "MTN Mobile Money",
      icons: [MTNIcon],
      countries: ["all"],
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

  // Update totalAmount whenever subtotal, shippingCost, or tax changes
  useEffect(() => {
    console.log("Subtotal:", subtotal);
    console.log("Shipping Cost:", shippingCost);
    console.log("Tax:", tax);

    const newTotalAmount = subtotal + shippingCost + tax;
    console.log("Calculated Total Amount:", newTotalAmount);

    setTotalAmount(newTotalAmount);
  }, [subtotal, shippingCost, tax]);

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
          //orderStatus: "Pending", // Include initial status/added
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

        // mpesa payment code
        // In the M-Pesa section of handlePayment:
        if (paymentMethod === "MPESA") {
          try {
            const mpesaPayload = {
              orderId: orderResponse.data.orderId,
              phoneNumber: paymentFields.phoneNumber,
              amount: totalAmount,
              description: `Payment for Sceed-Order #${orderResponse.data.orderId}`,
              accountReference: `SCEED-ORDER${orderResponse.data.orderId}`,
            };
            console.log("M-Pesa Payload:", mpesaPayload);

            // Update toast while initiating payment
            toast.update(toastId, {
              render: "Initiating M-Pesa payment...",
              type: "info",
              isLoading: true,
            });

            const mpesaResponse = await axios.post(
              API_ENDPOINTS.mpesaInitiate,
              mpesaPayload,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            console.log("M-Pesa Response:", mpesaResponse.data);

            // Check for success and required fields
            if (
              mpesaResponse.data.success &&
              mpesaResponse.data.checkoutRequestId
            ) {
              console.log(
                "Checkout Request ID:",
                mpesaResponse.data.checkoutRequestId
              ); // Debug checkoutRequestId

              // Update toast for STK push
              toast.update(toastId, {
                render: "Please check your phone for the M-Pesa prompt...",
                type: "info",
                isLoading: true,
                autoClose: false,
              });

              const checkoutRequestId = mpesaResponse.data.checkoutRequestId;
              let attempts = 0;
              const maxAttempts = 30; // 2 minutes total//.increased from 24
              const initialDelay = 15000; // 15 seconds initial delay
              const checkInterval = 5000; // 5 seconds between checks

              const checkPaymentStatus = async () => {
                try {
                  const verifyUrl =
                    API_ENDPOINTS.mpesaVerify(checkoutRequestId);
                  console.log("Verification URL:", verifyUrl); // Debug URL

                  const statusResponse = await axios.get(verifyUrl, {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  });

                  // Log the entire response for debugging
                  console.log(
                    "Payment status response checking:",
                    statusResponse.data
                  );

                  // Log the specific status
                  console.log(
                    "mpesaPayment specific status checking:",
                    statusResponse.data.status
                  );

                  if (statusResponse.data.success) {
                    if (
                      statusResponse.data.status === "Completed" ||
                      statusResponse.data.code === "0"
                    ) {
                      toast.update(toastId, {
                        render: "Payment successful! Redirecting...",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                      });

                      // clear cart
                      //await clearCart();

                      setTimeout(() => {
                        navigate("/payment/success", {
                          state: { orderId: orderResponse.data.orderId },
                        });
                      }, 2000);
                      return;
                    } else if (statusResponse.data.status === "Failed") {
                      toast.update(toastId, {
                        render:
                          statusResponse.data.failureReason ||
                          "Payment failed. Please try again.",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000,
                      });
                      setProcessingPayment(false);
                      return;
                    }
                  }

                  // Continue checking if still pending
                  attempts++;
                  if (attempts < maxAttempts) {
                    setTimeout(checkPaymentStatus, checkInterval);
                  } else {
                    toast.update(toastId, {
                      render: (
                        <span>
                          Payment verification timed out. If you completed the
                          payment, please contact{" "}
                          {/* <a
                            href="mailto:sceedmillinery@gmail.com"
                            className="underline text-blue-600 hover:text-blue-800">
                            support
                          </a> */}
                          <a
                            href="/contact"
                            target="_blank"
                            className="underline text-blue-600 hover:text-blue-800">
                            support
                          </a>
                          .
                        </span>
                      ),
                      type: "warning",
                      isLoading: false,
                      autoClose: false,
                    });
                    setProcessingPayment(false);
                  }
                } catch (error) {
                  console.error("Status check error:", error);
                  // Only show error after several failed attempts
                  if (attempts > 3) {
                    toast.update(toastId, {
                      render:
                        "Having trouble checking payment status. Please wait...",
                      type: "info",
                      isLoading: true,
                    });
                  }
                  // Continue checking despite errors
                  if (attempts < maxAttempts) {
                    setTimeout(checkPaymentStatus, checkInterval);
                  } else {
                    toast.update(toastId, {
                      render:
                        "Could not verify payment. If amount was deducted, please contact support.",
                      type: "warning",
                      isLoading: false,
                      autoClose: false,
                    });
                    setProcessingPayment(false);
                  }
                }
              };

              // Start checking after initial delay
              setTimeout(checkPaymentStatus, initialDelay);
            } else {
              throw new Error(
                mpesaResponse.data.message ||
                  "Failed to initiate M-Pesa payment"
              );
            }
          } catch (error) {
            console.error("M-Pesa Error:", error);
            toast.update(toastId, {
              render:
                error.response?.data?.message ||
                error.message ||
                "M-Pesa payment failed",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
            setProcessingPayment(false);
          }
        } else {
          // my existing DPO payment code...

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
  };
  // End of handlePayment

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
        {/* //<div className="container mx-auto px-4 py-4"> */}
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
                totalAmount={totalAmount}
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
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
