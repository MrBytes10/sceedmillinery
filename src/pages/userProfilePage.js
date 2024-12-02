// sceed_frontend/src/pages/userProfilePage.js

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Loader,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, [isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_ENDPOINTS.getUserProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      // Log response details for debugging
      console.log("Response status:", response.status);
      if (!response.ok) {
        // Get error message from response if possible
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error || errorData.message || "Failed to fetch profile";
        } catch {
          errorMessage = `Server returned ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setProfile(data);
      console.log("Profile data is:", data); //debug/// Log the received data
    } catch (error) {
      setError("Error loading profile. Please try again later.");
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleUpdateProfile = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     setUpdateSuccess(false);

  //     const response = await fetch(API_ENDPOINTS.updateUserProfile, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         fullName: profile.fullName,
  //         email: profile.email,
  //         phoneNumber: profile.phoneNumber,
  //         physicalAddress: profile.physicalAddress,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update profile");
  //     }

  //     setUpdateSuccess(true);
  //     setIsEditing(false);
  //   } catch (error) {
  //     setError("Error updating profile. Please try again.");
  //     console.error("Error updating profile:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setUpdateSuccess(false);

      const response = await fetch(API_ENDPOINTS.updateUserProfile, {
        method: "POST", // Changed from PUT to POST
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: profile.fullName,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          physicalAddress: profile.physicalAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setUpdateSuccess(true);
      setIsEditing(false);
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center container items-center min-h-screen bg-[#CECDC8]">
        <div className="flex items-center gap-2 text-[#212121]">
          <Loader className="animate-spin" size={24} />
          <span className="text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#CECDC8]">
        <div className="flex items-center gap-2 text-red-600">
          <X size={24} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-1">
        <div className="min-h-screen bg-[#CECDC8] py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-xl rounded-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#212121] flex items-center gap-2">
                  <User className="w-8 h-8" />
                  My Profile
                </h1>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-[#212121] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>

              {updateSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                  <Save size={18} />
                  Profile updated successfully!
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
                  <X size={18} />
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#212121] mb-2">
                      <User size={18} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profile?.fullName || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#212121] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#212121] mb-2">
                      <Mail size={18} />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile?.email || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#212121] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#212121] mb-2">
                      <Phone size={18} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profile?.phoneNumber || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#212121] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#212121] mb-2">
                      <MapPin size={18} />
                      Physical Address
                    </label>
                    <textarea
                      name="physicalAddress"
                      value={profile?.physicalAddress || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#212121] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors duration-200">
                      {loading ? (
                        <Loader className="animate-spin" size={18} />
                      ) : (
                        <Save size={18} />
                      )}
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        fetchProfile(); // Reset to original data
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200">
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
