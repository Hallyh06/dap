import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ViewCollege.css";
import AppLogo from "../assets/nuc_logox.png";

const ViewCollege = () => {
  const user = { name: "John Doe" }; // Placeholder for logged-in user data

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/colleges");
        setColleges(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  return (
    <div className="college-container">

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
    

      <h2>List of Colleges</h2>
      {loading ? (
        <p>Loading colleges...</p>
      ) : (
        <table className="college-table">
          <thead>
            <tr>
              <th>#</th>
              <th>College ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>University</th>
              <th>Departments</th>
            </tr>
          </thead>
          <tbody>
            {colleges.length === 0 ? (
              <tr>
                <td colSpan="6">No colleges found</td>
              </tr>
            ) : (
              colleges.map((college, index) => (
                <tr key={college._id}>
                  <td>{index + 1}</td>
                  <td>{college._id}</td>
                  <td>{college.name}</td>
                  <td>{college.description || "N/A"}</td>
                  <td>{college.university?.name || "N/A"}</td>
                  <td>
                    {college.departments.length > 0
                      ? college.departments.join(", ")
                      : "No departments"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewCollege;
