import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from "../assets/nuc_logox.png";
import '../styles/AddDap.css'; // Updated CSS for styling

function AddDap() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [status, setStatus] = useState('active');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call for creating a new DAP
    const response = await fetch('http://localhost:5000/api/dap/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, phone, university, status })
    });
    const data = await response.json();
    if (response.ok) {
      alert('DAP created successfully');
      navigate('/dashboard'); // Navigate to dashboard after successful creation
    } else {
      alert('Error creating DAP');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img
          src={AppLogo}
          alt="Logo"
          className="logo"
        />
      </div>
      <h2>Add New DAP</h2>
      <h3>Director of Academic Planning</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="University" 
          value={university} 
          onChange={(e) => setUniversity(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Status (default: active)" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          required 
        />
        <button type="submit">Create DAP</button>
      </form>
    </div>
  );
}

export default AddDap;
