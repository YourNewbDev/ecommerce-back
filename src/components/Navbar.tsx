import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <nav className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-gray-800 md:text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Sidebar</h1>
        </div>
        <ul className="mt-6 space-y-2">
          <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Home</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">About</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Services</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-700 rounded">Contact</a></li>
        </ul>
      </nav>

      {/* Navbar for small screens */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Navbar</h1>
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
        <div className={`bg-gray-800 p-4 text-center ${isOpen ? 'block' : 'hidden'}`}>
          <a href="#" className="block text-white hover:text-gray-400 py-2">Home</a>
          <a href="#" className="block text-white hover:text-gray-400 py-2">About</a>
          <a href="#" className="block text-white hover:text-gray-400 py-2">Services</a>
          <a href="#" className="block text-white hover:text-gray-400 py-2">Contact</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-6">
        <h1 className="text-3xl font-bold mb-4">Main Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default Navbar;
