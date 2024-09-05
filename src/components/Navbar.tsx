import React, { useState } from "react";
import useLogout from "../customHooks/useLogout";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useLogout()

  return (
    <>
      {/* Sidebar for larger screens */}
      <nav className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-56 md:bg-gray-800 md:text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center">
            E-COMMERCE ADMIN PANEL
          </h1>
        </div>
        <ul className="text-center mt-6 space-y-2 m-5 flex-grow">
          <li>
            <a href="#" className="block p-2 hover:bg-gray-900 rounded">
              Dashboard
            </a>
          </li>
          <Link to={'/product'} className="block p-2 hover:bg-gray-900 rounded">
            Product
          </Link>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-900 rounded">
              Category
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-900 rounded">
              Order
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-900 rounded">
              User
            </a>
          </li>
        </ul>

        <ul className="text-center m-5 mt-auto space-y-2">
          <li>
            <a href="#" className="block p-2 hover:bg-gray-900 rounded">
              Settings
            </a>
          </li>
          <li>
            <button onClick={handleLogout} type="button" className="content-center p-2 hover:bg-gray-900 rounded">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Navbar for small screens */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">E-COMMERCE</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`bg-gray-800 p-4 text-center ${isOpen ? "block" : "hidden"
            }`}
        >
          <a href="#" className="block text-white hover:bg-gray-900 py-2">
            Home
          </a>
          <a href="#" className="block text-white hover:bg-gray-900 py-2">
            About
          </a>
          <a href="#" className="block text-white hover:bg-gray-900 py-2">
            Services
          </a>
          <a href="#" className="block text-white hover:bg-gray-900 py-2">
            Contact
          </a>
          <a href="#" className="mt-8 block text-white hover:bg-gray-900 py-2">
            Settings
          </a>
          <a href="#" className="block text-white hover:bg-gray-900 py-2">
            Logout
          </a>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
