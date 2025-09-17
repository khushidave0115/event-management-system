import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('normal');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { name, email, password, role });
      alert('Signup success. Please login.');
      nav('/login');
    } catch (err) {
      console.error("Signup error:", err); // shows full error in console
      let msg = "Unknown error";

      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          msg = err.response.data;
        } else if (err.response.data.detail) {
          msg = err.response.data.detail;
        } else {
          msg = JSON.stringify(err.response.data);
        }
      } else {
        msg = err.message;
      }

      alert("Signup failed: " + msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="normal">Normal</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
