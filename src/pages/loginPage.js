//sceed_frontend/src/pages/loginPage.js

import React, { useState } from "react";
import Footer from "../components/Footer";
import SecondHeader from "../components/LoginHeader";
import logoImage from "../images/sceedBlackLogo.png";
import backgroundImage from "../images/woman-portrait-female-african-american.jpg";
import { API_ENDPOINTS } from "../config/api";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error message when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };
  // handle submit function for login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerMessage("");

    try {
      // Login request
      const response = await fetch(API_ENDPOINTS.loginUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { error: text };
      }

      if (!response.ok) {
        throw new Error(data.error || data);
      }

      // Store token and merge cart
      if (data.token) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userId", data.user.id.toString()); // from data.user.id in response JSON object from API
          localStorage.setItem("userEmail", data.user.email); // from data.user.email in response JSON object from API
        }

        // Cart merge should be a separate request with the new auth token
        try {
          const mergeResponse = await fetch(API_ENDPOINTS.mergeCart, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${data.token}`,
              "Content-Type": "application/json",
            },
          });

          if (!mergeResponse.ok) {
            console.warn("Cart merge failed, but continuing login");
          }
        } catch (error) {
          console.error("Error merging cart:", error);
          // Don't block the login process if cart merge fails
        }
      }

      setServerMessage("Login successful!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setServerMessage(error.message || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   setServerMessage("");

  //   try {
  //     const response = await fetch(API_ENDPOINTS.loginUser, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //       }),
  //     });

  //     // Parse the response text
  //     const text = await response.text();
  //     let data;
  //     try {
  //       // Try to parse as JSON if possible
  //       data = JSON.parse(text);
  //     } catch (e) {
  //       // If parsing fails, use the text directly
  //       data = { error: text };
  //     }

  //     if (!response.ok) {
  //       // Handle both object with error property and direct string error
  //       throw new Error(data.error || data);
  //     }

  //     // Store the authentication token
  //     if (data.token) {
  //       localStorage.setItem("authToken", data.token);
  //     }

  //     setServerMessage("Login successful!");
  //     setTimeout(() => {
  //       window.location.href = "/"; // or wherever you want to redirect after login
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setServerMessage(error.message || "Invalid email or password.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <SecondHeader />
      <main className="flex-grow relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: "brightness(0.9)",
          }}
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center bg-[rgba(206,205,200,0.8)] px-4 min-h-[calc(100vh-120px)] py-2">
          {/* Logo */}
          <div className="mb-2 mt-0">
            <img
              src={logoImage}
              alt="SCEED Millinery"
              className="w-[304px] h-[123px]"
            />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="solomonjeann@gmail.com"
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-black focus:border-black`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••••••"
                  className={`w-full px-4 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-black focus:border-black`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-600">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/3 md-1/4 py-2 px-4  bg-[#7B7B7B] text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Server Message */}
            {serverMessage && (
              <p
                className={`text-center mt-4 ${
                  serverMessage.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`}>
                {serverMessage}
              </p>
            )}

            {/* Sign Up Link */}
            <div className="flex items-center justify-center space-x-2">
              <span className="text-gray-700">
                Don't have an account with us?
              </span>
              <a
                href="/sign-up"
                className="text-[#3771C8] hover:underline font-bold">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
