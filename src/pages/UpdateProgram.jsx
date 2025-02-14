import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,  } from "react-router-dom";
import "../styles/CreateProgram.css"; // You can reuse the same styles
import AppLogo from "../assets/nuc_logox.png";

const UpdateProgram = () => {
  const { programId } = useParams();  // Get the program ID from the URL
  //const history = useHistory();
  
  const [programName, setProgramName] = useState("");
  const [programCode, setProgramCode] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the departments list for the select dropdown
    axios.get("http://localhost:5000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.log(err));

    // Fetch the existing program details based on programId
    axios.get(`http://localhost:5000/api/programs/${programId}`)
      .then((res) => {
        const programData = res.data;
        setProgramName(programData.programName);
        setProgramCode(programData.programCode);
        setSelectedDepartment(programData.departmentId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching program details");
        setLoading(false);
      });
  }, [programId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/programs/${programId}`, {
        programName,
        programCode,
        departmentId: selectedDepartment,
      });
      alert(response.data.message);
      //history.push("/view-programs");  // Redirect after successful update
    } catch (error) {
      alert("Error updating program");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="form-container">
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

      <h2>Update Program</h2>
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

        <button type="submit">Update Program</button>
      </form>
    </div>
  );
};

export default UpdateProgram;
