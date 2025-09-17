import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const role = localStorage.getItem('role') || 'guest';
  const token = localStorage.getItem('token');

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Name */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              EventSphere
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
              Events
            </Link>

            {/* Conditional Links based on Authentication */}
            {!token && (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
            {role === 'admin' && (
              <Link
                to="/admin"
                className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors duration-300"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}