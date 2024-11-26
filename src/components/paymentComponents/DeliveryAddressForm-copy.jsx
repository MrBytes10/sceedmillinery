// sceed_frontend/src/components/paymentComponents/DeliveryAddressForm.jsx
import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const DeliveryAddressForm = ({
  deliveryDetails,
  setDeliveryDetails,
  countries,
  cities,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 border-b pb-2">
        Delivery Address
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={deliveryDetails.fullName}
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
            value={deliveryDetails.phone}
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
              (country) => country.value === deliveryDetails.country
            )}
            onChange={(selectedOption) => {
              setDeliveryDetails((prev) => ({
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
              deliveryDetails.city
                ? {
                    label: deliveryDetails.city,
                    value: deliveryDetails.city,
                  }
                : null
            }
            onChange={(selectedOption) => {
              setDeliveryDetails((prev) => ({
                ...prev,
                city: selectedOption?.value || "",
              }));
            }}
            onCreateOption={(inputValue) => {
              setDeliveryDetails((prev) => ({
                ...prev,
                city: inputValue,
              }));
            }}
            placeholder="Select or type a city"
            isClearable
            className="w-full"
            noOptionsMessage={() =>
              deliveryDetails.country
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
            value={deliveryDetails.address}
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
            value={deliveryDetails.apartment}
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
          value={deliveryDetails.additionalInfo}
          onChange={handleInputChange}
          className="w-full rounded-md p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          rows="3"
          placeholder="Any special instructions you would wish to share with us?"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={deliveryDetails.saveInfo}
            onChange={(e) =>
              setDeliveryDetails((prev) => ({
                ...prev,
                saveInfo: e.target.checked,
              }))
            }
            className="mr-2"
          />
          Save information for next purchases
        </label>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
