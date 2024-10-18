import React, { useState } from "react";
import Footer from "../components/Footer";
import SecondHeader from "../components/signUpHeader";
import logoImage from "../images/sceedBlackLogo.png";
import { ReactComponent as KenyaFlag } from "../assets/icons/kenya-flag.svg"; // Adjust the path as necessary
import { ChevronDown } from "lucide-react";
import phoneUtils from "../utils/phoneUtils"; // Import phoneUtils
import backgroundImage from "../images/woman-portrait-female-african-american.jpg";

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
  const [inputFormat, setInputFormat] = useState("national");

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
    } else if (!phoneUtils.validateKenyanPhone(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid Kenyan phone number (07XX XXX XXX, 01XX XXX XXX, or +254 XXX XXX XXX)";
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

  // State for showing/hiding passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
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
      // Format the data according to nopCommerce's requirements
      const registrationData = {
        Customer: {
          FirstName: formData.fullName.split(" ")[0],
          LastName: formData.fullName.split(" ").slice(1).join(" "),
          Email: formData.email,
          Username: formData.email, // Using email as username
          PhoneNumber: phoneUtils.formatToInternational(formData.phoneNumber),
          Address: {
            Address1: formData.physicalAddress,
            CountryId: 115, // Kenya's ID in nopCommerce
          },
        },
        Password: formData.password,
      };
      // we Log the registrationData object to the console
      console.log("Registration Data:", registrationData);

      // Replace with your nopCommerce API endpoint
      const response = await fetch("/api/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Handle successful registration
      const data = await response.json();

      // Redirect to login or dashboard based on nopCommerce's response
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error); // Log error to console
      setApiError(
        error.message ||
          "An error occurred during registration. Please try again."
      );
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

  //function to handle the phone number dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        brightness: "0.9",
      }}>
      <SecondHeader />
      <section
        className="mb-0"
        style={{
          //backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with 80% opacity
          backgroundColor: "rgba(206, 205, 200, 0.8)", // grey-ish background with 90% opacity
        }}>
        <main className="flex-grow ">
          <div className="relative ">
            <div className="relative z-10 container mx-auto px-4 py-2 max-w-4xl min-h-[calc(100vh-120px)]">
              {/* Logo */}
              <div className="flex justify-center mb-0">
                <img
                  src={logoImage}
                  alt="SCEED Millinery"
                  className="w-[304px] h-[123px] md:w-1/3"
                  background="cover"
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

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex">
                      {/* Phone number input */}
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder={
                          inputFormat === "national"
                            ? "0712 345 678 or 0112 345 678"
                            : "0712 345 678 or 0112 345 678"
                        }
                        className={`w-full px-4 py-2 border-l border-t border-r border-b border-gray-300 rounded-r-md focus:ring-black focus:border-black ${
                          errors.phoneNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {/* Phone number prefix */}
                      <div className="relative">
                        {/* Trigger for dropdown */}
                        <div
                          className="flex items-center h-full cursor-pointer border border-gray-300 rounded-l-md px-2"
                          onClick={() => setDropdownOpen(!dropdownOpen)}>
                          <KenyaFlag
                            alt="KE"
                            className=" w-9 h-full mr-1 ml-1" // Set height to fill the container and reduce right margin
                            aria-hidden="true"
                          />
                          <ChevronDown className="w-4 h-4 text-gray-600 mr-2" />
                        </div>

                        {/* Dropdown options */}
                        {dropdownOpen && (
                          <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full">
                            <div
                              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                inputFormat === "national" ? "font-bold" : ""
                              }`}
                              onClick={() => {
                                setInputFormat("national");
                                setDropdownOpen(false);
                              }}>
                              0
                            </div>
                            <div
                              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                inputFormat === "international"
                                  ? "font-bold"
                                  : ""
                              }`}
                              onClick={() => {
                                setInputFormat("international");
                                setDropdownOpen(false);
                              }}>
                              +254
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <ErrorMessage error={errors.phoneNumber} />
                  </div>
                  {/* Password */}
                  {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-black focus:border-black ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage error={errors.password} />
                </div> */}
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
                        onClick={togglePasswordVisibility}
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
                        onClick={toggleConfirmPasswordVisibility}
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
