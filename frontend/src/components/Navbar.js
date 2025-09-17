import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const role = localStorage.getItem('role') || 'guest';
  const token = localStorage.getItem('token');
  return (
    <nav style={{background:'#0b5fff', padding:'10px 20px', color:'white'}}>
      <div style={{maxWidth:1000, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><Link to="/" style={{color:'white', textDecoration:'none', fontWeight:'bold'}}>Event Manager</Link></div>
        <div>
          <Link to="/" style={{color:'white', marginRight:12}}>Events</Link>
          {!token && <Link to="/login" style={{color:'white', marginRight:12}}>Login</Link>}
          {!token && <Link to="/signup" style={{color:'white', marginRight:12}}>Signup</Link>}
          {role === 'admin' && <Link to="/admin" style={{color:'white'}}>Admin</Link>}
        </div>
      </div>
    </nav>
  );
}
