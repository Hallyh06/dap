import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateProgram.css";
import AppLogo from "../assets/nuc_logox.png";

const CreateProgram = () => {
  const [programName, setProgramName] = useState("");
  const [programCode, setProgramCode] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  
  // Mock user data for demonstration
  const user = { name: "John Doe" };

  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/programs", {
        programName,
        programCode,
        departmentId: selectedDepartment,
      });
      alert(response.data.message);
      setProgramName("");
      setProgramCode("");
      setSelectedDepartment("");
    } catch (error) {
      alert("Error creating program");
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

      <h2>Create Program</h2>
      <form onSubmit={handleSubmit}>
        <label>Program Name</label>
        <input type="text" value={programName} onChange={(e) => setProgramName(e.target.value)} required />

        <label>Program Code</label>
        <input type="text" value={programCode} onChange={(e) => setProgramCode(e.target.value)} required />

        <label>Department</label>
        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} required>
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>{dep.departmentName}</option>
          ))}
        </select>

        <button type="submit">Add Program</button>
      </form>
    </div>
  );
};

export default CreateProgram;
