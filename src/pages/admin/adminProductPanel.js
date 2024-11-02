// sceed_frontend/src/pages/admin/ adminProductsPanel.js

import React, { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, Save, X } from "lucide-react";
//import { Alert, AlertDescription } from "@/components/ui/alert";
import { Alert } from "antd";
import { API_ENDPOINTS } from "../../config/api";

const AdminProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    price: "",
    productFeatures: "",
    material: "",
    images: {},
    availableColors: [],
  });
  const [colorInput, setColorInput] = useState({ name: "", code: "" });

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.getProducts);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products: " + err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? API_ENDPOINTS.getProduct(editingProduct.id)
        : `${API_ENDPOINTS.getProducts}/CreateProduct`; // Updated to match backend endpoint

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice
            ? parseFloat(formData.originalPrice)
            : null,
          availableColors: formData.availableColors.map((color) => ({
            code: color.code,
            name: color.name,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      await fetchProducts();
      resetForm();
      setError(null);
    } catch (err) {
      setError("Failed to save product: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(API_ENDPOINTS.getProduct(id), {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      await fetchProducts();
      setError(null);
    } catch (err) {
      setError("Failed to delete product: " + err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      originalPrice: product.originalPrice,
      price: product.price,
      productFeatures: product.productFeatures,
      material: product.material,
      images: product.images || {},
      availableColors: product.availableColors || [],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      originalPrice: "",
      price: "",
      productFeatures: "",
      material: "",
      images: {},
      availableColors: [],
    });
    setShowForm(false);
  };
  // //////////////////////////////////////////////////////////... rest of the code remains the same

  const addImage = () => {
    const key = prompt("Enter image label (e.g., main, thumbnail):");
    const url = prompt("Enter image URL:");
    if (key && url) {
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, [key]: url },
      }));
    }
  };

  const addColor = () => {
    if (colorInput.name && colorInput.code) {
      setFormData((prev) => ({
        ...prev,
        availableColors: [...prev.availableColors, colorInput],
      }));
      setColorInput({ name: "", code: "" });
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          <PlusCircle className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* {error && (
        <Alert className="mb-4 bg-red-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Original Price</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      originalPrice: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Product Features</label>
              <textarea
                value={formData.productFeatures}
                onChange={(e) =>
                  setFormData({ ...formData, productFeatures: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label>Images</label>
                <button
                  type="button"
                  onClick={addImage}
                  className="text-sm text-blue-600 hover:text-blue-800">
                  + Add Image URL
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(formData.images).map(([key, url]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-medium">{key}:</span>
                    <span className="text-sm truncate flex-1">{url}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = { ...formData.images };
                        delete newImages[key];
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label>Colors</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={colorInput.name}
                    onChange={(e) =>
                      setColorInput({ ...colorInput, name: e.target.value })
                    }
                    className="p-1 border rounded text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Color code (hex)"
                    value={colorInput.code}
                    onChange={(e) =>
                      setColorInput({ ...colorInput, code: e.target.value })
                    }
                    className="p-1 border rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="text-sm text-blue-600 hover:text-blue-800">
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.availableColors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color.code }}
                    />
                    <span>{color.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newColors = formData.availableColors.filter(
                          (_, i) => i !== index
                        );
                        setFormData({
                          ...formData,
                          availableColors: newColors,
                        });
                      }}
                      className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                <Save className="w-5 h-5" />
                {editingProduct ? "Update" : "Save"} Product
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Colors
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={Object.values(product.images)[0]}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">$ {product.price}</div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500">
                      Original: $ {product.originalPrice}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {product.availableColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 mr-4">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductPanel;
