import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-7xl md:w-full mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between items-center h-full">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">MyStore</h1>
          </div>

          <div className="flex items-center gap-3">
            <Avatar icon={<UserOutlined />} />
            <span className="text-gray-700">user Profile</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
