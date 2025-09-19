import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Send JSON instead of form-data
      const res = await API.post(
        '/auth/login',
        { email, password }, // JSON body
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Your backend returns { message, role }
      localStorage.setItem('role', res.data.role);

      alert(res.data.message);
      nav('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="p-6 shadow-lg rounded-lg bg-white">
        <h3 className="text-xl font-semibold mb-4 text-center">Login</h3>
        <form onSubmit={submit} className="space-y-4">
          <input
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
