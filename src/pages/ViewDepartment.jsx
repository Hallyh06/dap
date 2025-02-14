import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // For linking to Update Department and other actions
import "../styles/ViewDepartment.css"; // Import CSS for styling
import AppLogo from "../assets/nuc_logox.png";

const ViewDepartment = () => {
  const user = { name: "John Doe" }; // Placeholder for logged-in user data

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true); // For showing loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    axios.get("http://localhost:5000/api/departments") // Get the list of all departments
      .then((res) => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching departments");
        setLoading(false);
      });
  }, []);

  return (
    <div className="view-department">

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

      <h2>Departments List</h2>

      {loading && <p>Loading departments...</p>} {/* Show loading text while data is being fetched */}

      {error && <p>{error}</p>} {/* Show error message if there was an issue fetching data */}

      <div className="department-list">
        {departments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Department Code</th>
                <th>College</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department._id}>
                  <td>{department.departmentName}</td>
                  <td>{department.departmentCode}</td>
                  <td>{department.collegeId.collegeName}</td> {/* Assuming college data is populated */}
                  <td>
                    <Link to={`/update-department/${department._id}`} className="btn-update">
                      Update
                    </Link>
                    {/* You can add a delete button or other actions here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No departments found.</p> // If no departments are available
        )}
      </div>
    </div>
  );
};

export default ViewDepartment;
