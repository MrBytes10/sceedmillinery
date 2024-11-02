import React, { useState } from "react";
import { PlusCircle, MinusCircle, Upload } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Alert } from "antd";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    price: "",
    productFeatures: "",
    material: "",
    images: {},
    availableColors: [],
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleColorAdd = () => {
    setFormData((prev) => ({
      ...prev,
      availableColors: [...prev.availableColors, { code: "", name: "" }],
    }));
  };

  const handleColorRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      availableColors: prev.availableColors.filter((_, i) => i !== index),
    }));
  };

  const handleColorChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      availableColors: prev.availableColors.map((color, i) =>
        i === index ? { ...color, [field]: value } : color
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create product");

      setStatus({ type: "success", message: "Product created successfully!" });
      setFormData({
        name: "",
        originalPrice: "",
        price: "",
        productFeatures: "",
        material: "",
        images: {},
        availableColors: [],
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };
  const [error, setError] = useState(null);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <Typography className="text-2xl font-bold">Add New Product</Typography>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      originalPrice: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Sale Price ($)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Material</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, material: e.target.value }))
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Product Features
              </label>
              <textarea
                value={formData.productFeatures}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    productFeatures: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Enter product features..."
              />
            </div>
          </div>

          {/* Color Variants */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium">
                Available Colors
              </label>
              <button
                type="button"
                onClick={handleColorAdd}
                className="flex items-center text-blue-600 hover:text-blue-800">
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Color
              </button>
            </div>

            {formData.availableColors.map((color, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) =>
                      handleColorChange(index, "name", e.target.value)
                    }
                    placeholder="Color name"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={color.code}
                    onChange={(e) =>
                      handleColorChange(index, "code", e.target.value)
                    }
                    placeholder="Color code (hex)"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleColorRemove(index)}
                  className="text-red-600 hover:text-red-800">
                  <MinusCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Image Upload Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Image upload functionality to be implemented
            </p>
          </div>

          {/* Status Messages */}
          {/* {status.message && (
            <Alert
              variant={status.type === "error" ? "destructive" : "default"}>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )} */}
          {error && (
            <Alert message="Error" description={error} type="error" showIcon />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
