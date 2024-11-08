// src/pages/MessagesManagement.jsx

import React, { useEffect, useState } from "react";
import { Table, message as antdMessage, Spin, Button, Modal } from "antd";
import { RefreshCw, Trash2 } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";

const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch messages from the backend API
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.getContactMessages);
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setMessages(data);
      antdMessage.success("Messages loaded successfully");
    } catch (error) {
      console.error("Error fetching messages:", error);
      antdMessage.error("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to open the modal with full message details
  const showModal = (message) => {
    setSelectedMessage(message);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMessage(null);
  };

  // Table columns for Ant Design Table
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="text-blue-600">{text}</span>,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text, record) => (
        <span
          onClick={() => showModal(record)}
          className="text-gray-600 cursor-pointer hover:text-gray-800">
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Button
            onClick={() =>
              antdMessage.warning("Delete functionality not implemented")
            }
            type="link"
            danger
            icon={<Trash2 size={16} className="text-red-500" />}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Messages Management
        </h1>
        <Button
          type="primary"
          icon={<RefreshCw size={16} />}
          onClick={fetchMessages}
          disabled={loading}
          className="flex items-center">
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spin tip="Loading messages..." />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={messages}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="antd-table-custom"
        />
      )}

      {/* Modal for displaying full message */}
      <Modal
        title="Message Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}>
        {selectedMessage && (
          <div className="space-y-2">
            <p>
              <strong>Full Name:</strong> {selectedMessage.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Subject:</strong> {selectedMessage.subject}
            </p>
            <p>
              <strong>Message:</strong> {selectedMessage.message}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MessagesManagement;
