import React, { useState, useEffect } from 'react';
import '../styles/Accreditation.css';
import AppLogo from "../assets/nuc_logox.png";

function Accreditation() {
  const user = { name: "John Doe" }; // Placeholder for logged-in user data
  const [accreditations, setAccreditations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/accreditation/view')
      .then(response => response.json())
      .then(data => setAccreditations(data));
  }, []);

  // Function to forward accreditation to HOD
  const forwardToHOD = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/accreditation/forward/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentToHOD: true })
      });

      if (response.ok) {
        // Update UI after successful forward
        setAccreditations(accreditations.map(acc =>
          acc._id === id ? { ...acc, sentToHOD: true } : acc
        ));
        alert('Accreditation forwarded to HOD successfully!');
      } else {
        alert('Failed to forward accreditation.');
      }
    } catch (error) {
      console.error('Error forwarding accreditation:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="accreditation-container">
       {/* Top Navigation Bar */}
            <header className="dashboard-header">
              <div className="logo-title">
                <img src={AppLogo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                <h2>NUC Accreditation System</h2>
              </div>
              <div className="user-info">
                <span>Welcome, {user.name}</span>
                <button className="logout-btn">Logout</button>
              </div>
            </header>
      <h3>Accreditation Records</h3>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <th>Season</th>
            <th>Status</th>
            <th>Timeline</th>
            <th>Form File</th>
            <th>Forward to HOD</th>
          </tr>
        </thead>
        <tbody>
          {accreditations.map(acc => (
            <tr key={acc._id}>
              <td>{acc.program}</td>
              <td>{acc.season}</td>
              <td>{acc.status}</td>
              <td>{new Date(acc.timeline).toLocaleDateString()}</td>
              <td>
                <a href={acc.formFile} target="_blank" rel="noopener noreferrer">
                  View Form
                </a>
              </td>
              <td>
                <button 
                  onClick={() => forwardToHOD(acc._id)} 
                  disabled={acc.sentToHOD}
                  className={acc.sentToHOD ? "disabled-btn" : "forward-btn"}
                >
                  {acc.sentToHOD ? "Forwarded" : "Forward"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Accreditation;
