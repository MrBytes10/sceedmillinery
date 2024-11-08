// src/components/admin/AdminLayout.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquareMore,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "/admin/products",
      icon: <Package className="w-5 h-5" />,
      label: "Products",
    },
    {
      path: "/admin/orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      label: "Orders",
    },
    {
      path: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      label: "Users",
    },
    {
      path: "/admin/messages",
      icon: <MessageSquareMore className="w-5 h-5" />,
      label: "Client Messages",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <button
        className="fixed p-2 bg-white rounded-lg shadow-lg md:hidden top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`
        fixed top-0 left-0 z-40 w-64 h-screen transition-transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}>
        <div className="h-full px-3 py-4 bg-white border-r">
          <div className="mb-8 p-4">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }
                `}>
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50">
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className={`transition-margin md:ml-64 min-h-screen`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
