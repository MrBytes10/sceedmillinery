// sceed_frontend/src/pages/signUpPage.js
import React, { useState } from "react";
import Footer from "../components/Footer";
import SecondHeader from "../components/signUpHeader";
import logoImage from "../images/sceedBlackLogo.png";
import backgroundImage from "../images/woman-portrait-female-african-american.jpg";
import { API_ENDPOINTS } from "../config/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import phoneUtils from "../utils/phoneUtils";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    physicalAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Physical Address validation
    if (!formData.physicalAddress.trim()) {
      newErrors.physicalAddress = "Physical address is required";
    }

    // Phone Number validation using phoneUtils
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneUtils.isValidMobile("+" + formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle phone number change from react-phone-input-2
  const handlePhoneChange = (value, country) => {
    // value comes without +, but with country code
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value, // react-phone-input-2 handles formatting
    }));

    if (errors.phoneNumber) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: "+" + formData.phoneNumber, // Add + prefix for international format
        physicalAddress: formData.physicalAddress,
        password: formData.password,
      };

      const response = await fetch(API_ENDPOINTS.registerUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      window.location.href = "/registration-success";
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Error message component
  const ErrorMessage = ({ error }) =>
    error ? (
      <p className="text-red-700 bg-customGray rounded-2xl text-sm mt-1">
        {error}
      </p>
    ) : null;

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <SecondHeader />
      <section
        className="mb-0"
        style={{
          backgroundColor: "rgba(206, 205, 200, 0.8)",
        }}>
        <main className="flex-grow">
          <div className="relative">
            <div className="relative z-10 container mx-auto px-4 py-2 max-w-4xl min-h-[calc(100vh-120px)]">
              {/* Logo */}
              <div className="flex justify-center mb-0">
                <img
                  src={logoImage}
                  alt="SCEED Millinery"
                  className="w-[304px] h-[123px] md:w-1/3"
                />
              </div>

              {/* API Error Alert */}
              {apiError && (
                <div className="mb-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage error={errors.fullName} />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage error={errors.email} />
                  </div>

                  {/* Physical Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Physical Address
                    </label>
                    <input
                      type="text"
                      name="physicalAddress"
                      value={formData.physicalAddress}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black ${
                        errors.physicalAddress
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage error={errors.physicalAddress} />
                  </div>

                  {/* Phone Number - Using react-phone-input-2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"ug"} // Default country (Uganda)
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      inputClass={`w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      containerClass="phone-input"
                      enableSearch={true}
                      searchClass="search-class"
                      inputProps={{
                        name: "phoneNumber",
                        required: true,
                        autoFocus: false,
                      }}
                    />
                    <ErrorMessage error={errors.phoneNumber} />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Your Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-600">
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <ErrorMessage error={errors.password} />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-2 top-2 text-gray-600">
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <ErrorMessage error={errors.confirmPassword} />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/5 md:w-1/3 py-2 px-4 bg-[#7B7B7B] text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                  </button>
                </div>

                <section className="flex items-center justify-center">
                  <p className="mr-2">Already have an account with us?</p>
                  <a
                    href="/login"
                    className="text-[#3771C8] hover:underline font-bold">
                    Login
                  </a>
                </section>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </section>
    </div>
  );
};

export default SignUpPage;
