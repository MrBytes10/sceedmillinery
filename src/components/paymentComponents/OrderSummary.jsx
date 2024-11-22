// sceed_frontend/src/components/paymentComponents/OrderSummary.jsx
import React from "react";

const OrderSummary = ({
  cartItems,
  subtotal,
  selectedShipping,
  shippingCost,
  tax,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-medium mb-4 border-b pb-2">Order Summary</h2>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 mb-2">
          <div className="relative w-16 h-16 bg-gray-100 rounded-md">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {item.quantity}
            </span>
          </div>
          <div>
            <h3 className="font-medium">{item.productName}</h3>
            <p className="text-sm text-gray-500">Color: {item.color}</p>
          </div>
          <div className="ml-auto">
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      ))}

      {/* Order Totals */}
      <div className="border-t pt-2">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="flex items-center">
            Shipping
            <span
              className="ml-1 text-gray-500 cursor-help"
              title="Shipping costs vary by location">
              ⓘ
            </span>
          </span>
          <span
            className={
              selectedShipping === "self-pickup"
                ? "text-green-600"
                : "text-gray-600"
            }>
            {selectedShipping === "self-pickup"
              ? "FREE"
              : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="flex items-center">
            Tax
            <span
              className="ml-1 text-gray-500 cursor-help"
              title="Tax may vary by location">
              ⓘ
            </span>
          </span>
          <span className="text-gray-600">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Total</span>
          <div className="text-right">
            <span className="block font-medium">
              ${(subtotal + shippingCost + tax).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
