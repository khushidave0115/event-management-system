
import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const form = new URLSearchParams();
      form.append('username', email);
      form.append('password', password);
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.user.role);
      nav('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h3 className="text-xl font-semibold mb-3">Login</h3>
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" />
          <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
