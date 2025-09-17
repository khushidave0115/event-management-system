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
      alert('Login failed');
    }
  };

  return (
    <div style={{maxWidth:400, margin:'20px auto'}}>
      <div className="card">
        <h3>Login</h3>
        <form onSubmit={submit}>
          <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}} />
          <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}} />
          <button style={{background:'#0b5fff', color:'white', padding:'8px 12px'}}>Login</button>
        </form>
      </div>
    </div>
  );
}
