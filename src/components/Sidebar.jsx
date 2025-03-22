import React from "react";
import { ShoppingOutlined, SwapOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 w-64 h-screen bg-gray-50 pt-16">
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-50 hover:text-blue-500"
                }`
              }
            >
              <ShoppingOutlined />
              <span className="font-medium">Product Details</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-50 hover:text-blue-500"
                }`
              }
            >
              <SwapOutlined />
              <span className="font-medium">Compare Products</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
