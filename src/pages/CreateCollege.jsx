import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateCollege.css"; // Import the CSS file
import AppLogo from "../assets/nuc_logox.png";

const CreateCollege = () => {
  const user = { name: "John Doe" }; // Placeholder for logged-in user data
  const [collegeId, setCollegeId] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Fetch list of universities
    axios.get("http://localhost:5000/api/universities")
      .then(response => setUniversities(response.data))
      .catch(error => console.error("Error fetching universities:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/colleges", {
        collegeId,
        name: collegeName,
        description,
        university,
      });
      alert(response.data.message);
      setCollegeId("");
      setCollegeName("");
      setDescription("");
      setUniversity("");
    } catch (error) {
      alert("Error creating college");
    }
  };

  return (
    <div className="form-container">
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

            <h2>Create College</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter College ID"
            value={collegeId}
            onChange={(e) => setCollegeId(e.target.value)}
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
          <textarea
            placeholder="Enter College Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          >
            <option value="">Select University</option>
            {universities.map((uni) => (
              <option key={uni._id} value={uni._id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add College</button>
      </form>
    </div>
  );
};

export default CreateCollege;
