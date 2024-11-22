// sceed_frontend/src/components/paymentComponents/ShippingOptions.jsx
import React from "react";

const ShippingOptions = ({
  selectedShipping,
  handleShippingSelection,
  shippingCost,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Shipping Options</h3>
      <div className="space-y-3">
        <label className="flex items-center p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
          <input
            type="radio"
            name="shipping"
            value="self-pickup"
            checked={selectedShipping === "self-pickup"}
            onChange={() => handleShippingSelection("self-pickup")}
            className="mr-3"
          />
          <span>Self Pick-up</span>
          <span className="ml-auto">Free</span>
        </label>

        <label className="flex items-center p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
          <input
            type="radio"
            name="shipping"
            value="fedx"
            checked={selectedShipping === "fedx"}
            onChange={() => handleShippingSelection("fedx")}
            className="mr-3"
          />
          <span>FedEx International Shipping (5-10 business days)</span>
          <span className="ml-auto">${shippingCost.toFixed(2)}</span>
        </label>

        <label className="flex items-center p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
          <input
            type="radio"
            name="shipping"
            value="dhl-express"
            checked={selectedShipping === "dhl-express"}
            onChange={() => handleShippingSelection("dhl-express")}
            className="mr-3"
          />
          <span>DHL Express (5-10 business days)</span>
          <span className="ml-auto">${shippingCost.toFixed(2)}</span>
        </label>
      </div>
    </div>
  );
};

export default ShippingOptions;
