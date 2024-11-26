import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const DeliveryAddressForm = ({
  deliveryAddress,
  setDeliveryAddress,
  countries,
  cities,
}) => {
  const [useSavedDetails, setUseSavedDetails] = useState(true);

  useEffect(() => {
    const savedDetails = localStorage.getItem("savedDeliveryAddress");
    if (savedDetails) {
      const parsedDetails = JSON.parse(savedDetails);
      if (useSavedDetails) {
        setDeliveryAddress((prev) => ({
          ...prev,
          ...parsedDetails,
          saveInfo: true,
        }));
      }
    }
  }, [useSavedDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = {
      ...deliveryAddress,
      [name]: value,
    };
    setDeliveryAddress(updatedDetails);

    // Only save if the save checkbox is checked
    if (deliveryAddress.saveInfo) {
      localStorage.setItem(
        "savedDeliveryAddress",
        JSON.stringify(updatedDetails)
      );
    }
  };

  const handleSaveInfoChange = (e) => {
    const isChecked = e.target.checked;
    setDeliveryAddress((prev) => ({
      ...prev,
      saveInfo: isChecked,
    }));

    if (isChecked) {
      localStorage.setItem(
        "savedDeliveryAddress",
        JSON.stringify(deliveryAddress)
      );
    }
  };

  const clearSavedDetails = () => {
    localStorage.removeItem("savedDeliveryAddress");
    setDeliveryAddress({
      fullName: "",
      country: "",
      city: "",
      phone: "",
      address: "",
      apartment: "",
      additionalInfo: "",
      saveInfo: false,
    });
    setUseSavedDetails(false);
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 border-b pb-2">
        Delivery Address
      </h2>

      {/* Add this section if saved details exist */}
      {localStorage.getItem("savedDeliveryAddress") && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={useSavedDetails}
                onChange={(e) => setUseSavedDetails(e.target.checked)}
                className="mr-2"
              />
              Use saved delivery information
            </label>
            <button
              onClick={clearSavedDetails}
              className="text-sm text-red-600 hover:text-red-800">
              Clear saved information
            </button>
          </div>
        </div>
      )}

      {/* Existing form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={deliveryAddress.fullName}
            onChange={handleInputChange}
            className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={deliveryAddress.phone}
            onChange={handleInputChange}
            className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="+123 456 789"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Country</label>
          <Select
            options={countries}
            value={countries.find(
              (country) => country.value === deliveryAddress.country
            )}
            onChange={(selectedOption) => {
              setDeliveryAddress((prev) => ({
                ...prev,
                country: selectedOption?.value || "",
                city: "",
              }));
            }}
            placeholder="Select a country"
            isClearable
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">City</label>
          <CreatableSelect
            options={cities}
            value={
              deliveryAddress.city
                ? {
                    label: deliveryAddress.city,
                    value: deliveryAddress.city,
                  }
                : null
            }
            onChange={(selectedOption) => {
              setDeliveryAddress((prev) => ({
                ...prev,
                city: selectedOption?.value || "",
              }));
            }}
            onCreateOption={(inputValue) => {
              setDeliveryAddress((prev) => ({
                ...prev,
                city: inputValue,
              }));
            }}
            placeholder="Select or type a city"
            isClearable
            className="w-full"
            noOptionsMessage={() =>
              deliveryAddress.country
                ? "Type to add a new city"
                : "Select a country first"
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={deliveryAddress.address}
            onChange={handleInputChange}
            className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="123 Main St"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            name="apartment"
            value={deliveryAddress.apartment}
            onChange={handleInputChange}
            className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Apt 4B"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Additional Information</label>
        <textarea
          name="additionalInfo"
          value={deliveryAddress.additionalInfo}
          onChange={handleInputChange}
          className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          rows="3"
          placeholder="Any special instructions you would wish to share with us?"
        />
      </div>

      {/* Modified save checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={deliveryAddress.saveInfo}
            onChange={handleSaveInfoChange}
            className="mr-2"
          />
          {localStorage.getItem("savedDeliveryAddress")
            ? "Update saved information with these details"
            : "Save information for next purchases"}
        </label>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
