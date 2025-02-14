import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateDepartment.css"; // Import the CSS file
import AppLogo from "../assets/nuc_logox.png";

const CreateDepartment = () => {
  const user = { name: "John Doe" }; // Placeholder for logged-in user data

  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/colleges")
      .then((res) => setColleges(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/departments", {
        departmentName,
        departmentCode,
        collegeId: selectedCollege,
      });
      alert(response.data.message);
      setDepartmentName("");
      setDepartmentCode("");
      setSelectedCollege("");
    } catch (error) {
      alert("Error creating department");
    }
  };

  return (
    <div className="create-department-form">
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
      <h2>Create Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Department Name</label>
          <input 
            type="text" 
            value={departmentName} 
            onChange={(e) => setDepartmentName(e.target.value)} 
            required 
            placeholder="Enter department name"
          />
        </div>

        <div className="input-group">
          <label>Department Code</label>
          <input 
            type="text" 
            value={departmentCode} 
            onChange={(e) => setDepartmentCode(e.target.value)} 
            required 
            placeholder="Enter department code"
          />
        </div>

        <div className="input-group">
          <label>College</label>
          <select 
            value={selectedCollege} 
            onChange={(e) => setSelectedCollege(e.target.value)} 
            required 
          >
            <option value="">Select College</option>
            {colleges.map((col) => (
              <option key={col._id} value={col._id}>{col.collegeName}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Add Department</button>
      </form>
    </div>
  );
};

export default CreateDepartment;
