import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backgroundImage from "../images/woman-portrait-female-african-american.jpg";
import RegistrationSuccessImg from "../images/registration-success.png";
import API_ENDPOINTS from "../config/api";

const RegistrationSuccessPage = () => {
  // State to track if the user has opted into the mailing list subscription
  const [isSubscribed, setIsSubscribed] = useState(false);

  // useEffect hook to handle mailing list subscription when `isSubscribed` changes to true
  useEffect(() => {
    // Function to handle subscription API call
    const handleSubscription = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.subscribeUser, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Auth token for secure access
          },
          body: JSON.stringify({ subscribed: true }), // Request body indicating subscription status
        });

        if (!response.ok) {
          throw new Error("Subscription failed"); // Handle any errors during the request
        }

        console.log("Successfully subscribed to mailing list"); // Log success message to console
      } catch (error) {
        console.error("Subscription error:", error); // Log error message to console
      }
    };

    // Trigger subscription only if `isSubscribed` is true
    if (isSubscribed) {
      handleSubscription();
    }
  }, [isSubscribed]);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Header />
      <section
        className="flex-grow flex flex-col"
        style={{
          backgroundColor: "rgba(206, 205, 200, 0.8)",
        }}>
        <main className="flex-grow container mx-auto px-4 py-1 max-w-4xl min-h-[calc(100vh-120px)]">
          {/*Registration Success Image*/}
          <div className="flex justify-center mb-2">
            <div className="relative w-full max-w-[600px] h-[300px]">
              <img
                src={RegistrationSuccessImg}
                alt="Registration Success"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Success Message Container */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold text-gray-900">
              Your Account has been Successfully created
            </h1>

            <p className="text-sm text-[#212121] leading-relaxed px-2 font-poppins tracking-wide font-[12px]">
              Welcome to Sceed Millinery! Your account has been successfully
              created. You're now part of our exclusive community, where you'll
              enjoy easy access to our stunning collection of handcrafted
              fascinators, personalized services, and special offers. We're
              thrilled to have you with us and can't wait to help you find the
              perfect piece to elevate your style!
            </p>

            {/* Mailing List Subscription ---// Update the checkbox*/}
            <div className="mt-4">
              <label className="inline-flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={isSubscribed}
                  onChange={(e) => setIsSubscribed(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-gray-600 rounded"
                />
                <span className="text-sm text-[#212121]">
                  Subscribe to our Mailing List?
                </span>
              </label>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => (window.location.href = "/shop")}
                className="bg-[#7B7B7B] text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Start Shopping
              </button>
              <button
                onClick={() => (window.location.href = "/my-profile")}
                className="bg-[#7B7B7B] text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                View Account
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </section>
    </div>
  );
};

export default RegistrationSuccessPage;
