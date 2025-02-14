import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddHOD.css";  // You can add your styles here
import AppLogo from "../assets/nuc_logox.png"; // Logo for the header

const AddHOD = () => {
  const [hodName, setHodName] = useState("");
  const [hodEmail, setHodEmail] = useState("");
  const [hodPhone, setHodPhone] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    // Fetch departments from the backend
    axios.get("http://localhost:5000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/hods", {
        hodName,
        hodEmail,
        hodPhone,
        departmentId: selectedDepartment,
      });
      alert(response.data.message);
      setHodName("");
      setHodEmail("");
      setHodPhone("");
      setSelectedDepartment("");
    } catch (error) {
      alert("Error adding HOD");
    }
  };

  return (
    <div className="add-hod-container">
      {/* Top Navigation Bar */}
      <header className="dashboard-header">
        <div className="logo-title">
          <img src={AppLogo} alt="Logo" style={{ width: '100px', height: '100px' }} />
          <h2>NUC Accreditation System</h2>
        </div>
        <div className="user-info">
          <span>Welcome, John Doe</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <h2>Add New HOD</h2>
      <form onSubmit={handleSubmit}>
        <label>HOD Name</label>
        <input
          type="text"
          value={hodName}
          onChange={(e) => setHodName(e.target.value)}
          required
        />

        <label>HOD Email</label>
        <input
          type="email"
          value={hodEmail}
          onChange={(e) => setHodEmail(e.target.value)}
          required
        />

        <label>HOD Phone</label>
        <input
          type="text"
          value={hodPhone}
          onChange={(e) => setHodPhone(e.target.value)}
          required
        />

        <label>Department</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.departmentName}
            </option>
          ))}
        </select>

        <button type="submit">Add HOD</button>
      </form>
    </div>
  );
};

export default AddHOD;
