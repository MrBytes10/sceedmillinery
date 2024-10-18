import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import logoImage from "../images/sceedBlackLogo.png";
import backgroundImage from "../images/woman-portrait-female-african-american.jpg";
import RegistrationSuccessImg from "../images/registration-success.png";

const RegistrationSuccessPage = () => {
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
                alt="Registration Success Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Success Message Container */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h1 className="text-xl font-bold text-gray-900">
              Your Account has been Successfully created
            </h1>

            <p className="text-sm text-[#212121] leading-relaxed px-2 font-poppins font-[12px]">
              Welcome to Sceed Millinery! Your account has been successfully
              created. You're now part of our exclusive community, where you'll
              enjoy easy access to our stunning collection of handcrafted
              fascinators, personalized services, and special offers. We're
              thrilled to have you with us and can't wait to help you find the
              perfect piece to elevate your style!
            </p>

            {/* Mailing List Subscription */}
            <div className="mt-4">
              <label className="inline-flex items-center space-x-1">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-600 rounded"
                />
                <span className="text-sm text-[#212121]">
                  Subscribe to our Mailing List?
                </span>
              </label>
            </div>

            {/* Navigation Buttons
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => (window.location.href = "/shop")}
                className="bg-[#7B7B7B] text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Start Shopping
              </button>
              <button
                onClick={() => (window.location.href = "/account")}
                className="bg-[#7B7B7B] text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
                View Account
              </button>
            </div> */}
          </div>
        </main>
        <Footer />
      </section>
    </div>
  );
};

export default RegistrationSuccessPage;
