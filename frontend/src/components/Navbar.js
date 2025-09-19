import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const role = localStorage.getItem('role') || 'guest';
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto logout on tab/window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Handle Login / Logout button click
  const handleAuthButton = () => {
    if (token) {
      // Logout
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setToken(null);
      navigate('/login');
    } else {
      // Login
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">EventSphere</h1>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {role === 'admin' && (
              <Link
                to="/admin"
                className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors duration-300"
              >
                Admin Dashboard
              </Link>
            )}

            {/* Dynamic Login / Logout button */}
            <button
              onClick={handleAuthButton}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                token ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {token ? 'Logout' : 'Login'}
            </button>

            {!token && (
              <Link
                to="/signup"
                className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors duration-300"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {role === 'admin' && (
            <Link
              to="/admin"
              className="block bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors duration-300"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Dynamic Login / Logout button */}
          <button
            onClick={handleAuthButton}
            className={`block w-full text-left px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              token ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {token ? 'Logout' : 'Login'}
          </button>

          {!token && (
            <Link
              to="/signup"
              className="block bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors duration-300"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
