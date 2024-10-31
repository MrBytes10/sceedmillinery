// sceed_frontend/src/components/admin/productsManagement.jsx

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  notification,
  Popconfirm,
  Space,
} from "antd";
import { API_ENDPOINTS } from "../../config/api";
import { Plus, Edit2, Trash2 } from "lucide-react";
import axios from "axios";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.getProducts);
      setProducts(response.data);
    } catch (error) {
      notification.error({ message: "Failed to load products" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open modal for creating or editing a product
  // const openModal = (product = null) => {
  //   setEditingProduct(product);
  //   setIsEditing(!!product);
  //   setIsModalOpen(true);
  //   form.setFieldsValue({
  //     ...product,
  //     images: product?.images || [{ colorCode: "", url: "" }],
  //     availableColors: product?.availableColors || [{ code: "", name: "" }],
  //   });
  // };
  const openModal = (product = null) => {
    console.log("Product data:", product); // Keep this for debugging
    setEditingProduct(product);
    setIsEditing(!!product);
    setIsModalOpen(true);

    if (product) {
      // Handle both new Images array and existing single image
      let transformedImages = [{ colorCode: "", url: "" }];

      if (product.images && product.images.length > 0) {
        // Use new image format if available
        transformedImages = product.images.map((img) => ({
          colorCode: img.color,
          url: img.image,
        }));
      } else if (product.displayImage) {
        // Fall back to single image if that's what we have
        transformedImages = [
          {
            colorCode: "", // or get from availableColors[0] if needed
            url: product.displayImage,
          },
        ];
      }

      form.setFieldsValue({
        ...product,
        images: transformedImages,
        availableColors: product.availableColors || [{ code: "", name: "" }],
      });
    } else {
      form.setFieldsValue({
        images: [{ colorCode: "", url: "" }],
        availableColors: [{ code: "", name: "" }],
      });
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle form submission for create/edit
  const handleFormSubmit = async (values) => {
    // Transform the images array back to the format expected by the backend
    const imagesPayload = {};
    values.images.forEach(({ colorCode, url }) => {
      imagesPayload[colorCode] = url;
    });

    const payload = {
      ...values,
      images: imagesPayload,
      availableColors: values.availableColors.map(({ code, name }) => ({
        code,
        name,
      })),
    };

    try {
      if (isEditing) {
        await axios.put(
          API_ENDPOINTS.updateProduct(editingProduct.id),
          payload
        );
        notification.success({ message: "Product updated successfully" });
      } else {
        await axios.post(API_ENDPOINTS.createProduct, payload);
        notification.success({ message: "Product created successfully" });
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      notification.error({ message: "Failed to save product" });
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(API_ENDPOINTS.deleteProduct(id));
      notification.success({ message: "Product deleted successfully" });
      fetchProducts();
    } catch (error) {
      notification.error({ message: "Failed to delete product" });
    }
  };

  // Add stock update handler
  const handleStockUpdate = async (productId, quantity) => {
    try {
      await axios.patch(`${API_ENDPOINTS.updateStock(productId)}`, {
        quantity,
      });
      notification.success({ message: "Stock updated successfully" });
      fetchProducts();
    } catch (error) {
      notification.error({ message: "Failed to update stock" });
    }
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Material", dataIndex: "material", key: "material" },
    {
      title: "Stock-Available",
      key: "stock",
      render: (_, record) => (
        <Space>
          <Input
            type="number"
            defaultValue={record.stockQuantity}
            style={{ width: 80 }}
            min={0}
            onBlur={(e) =>
              handleStockUpdate(record.id, parseInt(e.target.value))
            }
          />
          <span
            className={`px-2 py-1 rounded ${
              record.stockQuantity > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {record.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </Space>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<Edit2 size={16} />}
            onClick={() => openModal(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No">
            <Button icon={<Trash2 size={16} />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className=" justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-3">Products Management</h1>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => openModal()}
          style={{ marginBottom: 16, marginTop: 16 }}>
          Add Product
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for create/edit product */}
      <Modal
        title={isEditing ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={editingProduct}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}>
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}>
            <Input type="number" placeholder="Enter price" />
          </Form.Item>
          <Form.Item name="originalPrice" label="Original Price">
            <Input type="number" placeholder="Enter original price" />
          </Form.Item>
          <Form.Item name="material" label="Material">
            <Input placeholder="Enter material" />
          </Form.Item>
          <Form.Item name="productFeatures" label="Product Features">
            <Input.TextArea placeholder="Enter product features" rows={3} />
          </Form.Item>
          {/*inStock and out of Stock*/}
          <Form.Item
            name="stockQuantity"
            label="Stock Quantity"
            rules={[
              { required: true, message: "Please enter stock quantity" },
            ]}>
            <Input type="number" min={0} placeholder="Enter stock quantity" />
          </Form.Item>

          {/* Dynamic fields for images */}
          <Form.List name="images">
            {(fields, { add, remove }) => (
              <div>
                <label>
                  {" "}
                  <b>Images</b>
                </label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "colorCode"]}
                      rules={[{ required: true, message: "Enter color name" }]}>
                      <Input placeholder="Color name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      rules={[{ required: true, message: "Enter image URL" }]}>
                      <Input placeholder="Image URL" />
                    </Form.Item>
                    <Button onClick={() => remove(name)}>Remove</Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Image
                </Button>
              </div>
            )}
          </Form.List>

          {/* Dynamic fields for available colors */}
          <Form.List name="availableColors">
            {(fields, { add, remove }) => (
              <div>
                <label>
                  <b>Available Colors</b>
                </label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "Enter color name" }]}>
                      <Input placeholder="Color Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "code"]}
                      rules={[{ required: true, message: "Enter color code" }]}>
                      <Input placeholder="Color Code" />
                    </Form.Item>

                    <Button onClick={() => remove(name)}>Remove</Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Color
                </Button>
              </div>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {isEditing ? "Update Product" : "Create Product"}
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsManagement;
