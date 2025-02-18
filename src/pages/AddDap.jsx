import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from "../assets/nuc_logox.png";
import '../styles/AddDap.css';

function AddDap() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    university: '',
    status: 'active'
  });
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


   // Fetch universities from the database
   useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/universities'); // Adjust API URL if needed
        const data = await response.json();
        setUniversities(data);
      } catch (err) {
        console.error('Error fetching universities:', err);
      }
    };
    fetchUniversities();
  }, []);




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/dap/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (response.ok) {
        alert('DAP created successfully');
         // Pass university name to Dashboard via state
         navigate('/dashboard', { state: { universityName: formData.university } });
      } else {
        setError(data.message || 'Error creating DAP');
      }
    } catch (err) {
      setLoading(false);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={AppLogo} alt="Logo" className="logo" />
      </div>
      <h2>Add New DAP</h2>
      <h3>Director of Academic Planning</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          value={formData.fullName} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
        />
        {/* Dropdown for universities */}
        <select 
          name="university" 
          value={formData.university} 
          onChange={handleChange} 
          required
        >
          <option value="">Select University</option>
          {universities.map((uni) => (
            <option key={uni._id} value={uni.name}>{uni.name}</option>
          ))}
        </select>
       
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create DAP'}
        </button>
      </form>
    </div>
  );
}

export default AddDap;