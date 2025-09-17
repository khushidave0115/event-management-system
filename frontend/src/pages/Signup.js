import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('normal');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', {name, email, password, role});
      alert('Signup success. Please login.');
      nav('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div style={{maxWidth:400, margin:'20px auto'}}>
      <div className="card">
        <h3>Signup</h3>
        <form onSubmit={submit}>
          <input required placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}} />
          <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}} />
          <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}} />
          <select value={role} onChange={e=>setRole(e.target.value)} style={{width:'100%', padding:8, marginBottom:8}}>
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
          </select>
          <button style={{background:'#16a34a', color:'white', padding:'8px 12px'}}>Signup</button>
        </form>
      </div>
    </div>
  );
}
