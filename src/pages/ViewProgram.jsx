import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ViewProgram.css"; // Create this CSS file for custom styles
import AppLogo from "../assets/nuc_logox.png"; // Logo for the header

const ViewProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch programs data from the backend
    axios.get("http://localhost:5000/api/programs")
      .then((res) => {
        setPrograms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Error fetching programs.");
      });
  }, []);

  const handleDelete = async (programId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await axios.delete(`http://localhost:5000/api/programs/${programId}`);
        alert("Program deleted successfully.");
        // Remove the program from the local state after deletion
        setPrograms(programs.filter(program => program._id !== programId));
      } catch (error) {
        alert("Error deleting program.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="view-program-container">
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

      <h2>List of Programs</h2>
      <div className="program-table-container">
        <table className="program-table">
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Program Code</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.length > 0 ? (
              programs.map((program) => (
                <tr key={program._id}>
                  <td>{program.programName}</td>
                  <td>{program.programCode}</td>
                  <td>{program.departmentName}</td> {/* Assuming departmentName is in the program object */}
                  <td>
                    <Link to={`/update-program/${program._id}`} className="edit-btn">Edit</Link>
                    <button onClick={() => handleDelete(program._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No programs available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProgram;
