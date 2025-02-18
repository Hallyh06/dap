// AddUniversity.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUniversity = () => {
  const navigate = useNavigate();

  // Form state
  const [university, setUniversity] = useState({
    name: '',
    location: '',
    accreditationStatus: 'Pending',
  });

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUniversity({
      ...university,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send a POST request to the backend to add the university
      const response = await axios.post('http://localhost:5000/api/university', university);

      // Check if the university was added successfully
      if (response.status === 201) {
        // Redirect to the universities list page after successful addition
       // navigate('/universities');
      }
    } catch (error) {
      console.error('Error adding university:', error);
      setError('Error adding university. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-university-container">
      <h2>Add New University</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">University Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={university.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={university.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accreditationStatus">Accreditation Status</label>
          <select
            id="accreditationStatus"
            name="accreditationStatus"
            value={university.accreditationStatus}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Accredited">Accredited</option>
            <option value="Revoked">Revoked</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding University...' : 'Add University'}
        </button>
      </form>
    </div>
  );
};

export default AddUniversity;
