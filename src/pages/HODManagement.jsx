import React, { useState, useEffect } from 'react';
import '../styles/HODManagement.css';

function HODManagement() {
  const [hods, setHods] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', gender: '', phone: '', password: '', field: '', academicRank: '', sequenceNumber: '', photo: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/hod/view')
      .then(response => response.json())
      .then(data => setHods(data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/hod/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('HOD added successfully');
  };

  return (
    <div className="hod-management">
      <h2>Manage HODs</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <button type="submit">Add HOD</button>
      </form>
      <ul>
        {hods.map(hod => (
          <li key={hod._id}>{hod.name} - {hod.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default HODManagement;