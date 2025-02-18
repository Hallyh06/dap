import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateCollege.css"; // Import the CSS file
import AppLogo from "../assets/nuc_logox.png";
import { useNavigate } from "react-router-dom";

const CreateCollege = () => {
  const navigate = useNavigate();
  const user = { name: "John Doe" }; // Placeholder for logged-in user data

  const [collegeCode, setCollegeCode] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [deanName, setDeanName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/colleges", {
        collegeCode,
        name: collegeName,
        deanName,
        description,
      });

      alert(response.data.message);

      // Clear form fields
      setCollegeCode("");
      setCollegeName("");
      setDeanName("");
      setDescription("");

      // Navigate to another page (e.g., college list)
      navigate("/colleges");
    } catch (error) {
      setError("Error creating college. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Top Navigation Bar */}
      <header className="dashboard-header" style={{ backgroundColor: 'green', borderRadius: '0px' }}>
        <div className="logo-title">
          <img src={AppLogo} alt="Logo" style={{ width: "100px", height: "100px" }} />
          <h2>NUC Accreditation System</h2>
        </div>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button className="logout-btn" onClick={() => {/* Implement logout functionality */}}>
            Logout
          </button>
        </div>
      </header>

      <h2>Create College</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} style={{ width: '600px', padding: '20px' }}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter College Code"
            value={collegeCode}
            onChange={(e) => setCollegeCode(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter College Name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Dean's Name"
            value={deanName}
            onChange={(e) => setDeanName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <textarea
            placeholder="Enter College Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding College..." : "Add College"}
        </button>
      </form>
    </div>
  );
};

export default CreateCollege;
