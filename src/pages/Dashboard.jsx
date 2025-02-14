import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "../styles/Dashboard.css";
import AppLogo from "../assets/nuc_logox.png";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const user = { name: "John Doe" }; // Placeholder for logged-in user data

  // Placeholder data for statistics
  const colleges = 10;
  const departments = 25;
  const programs = 40;
  const accreditedColleges = 7;
  const pendingColleges = 3;

  const accreditedPrograms = 30;
  const pendingPrograms = 10;

  const accreditedDepartments = 20;
  const pendingDepartments = 5;


  // Dropdown menu states
  const [collegeDropdown, setCollegeDropdown] = useState(false);
  const [programDropdown, setProgramDropdown] = useState(false);
  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [HODDropdown, setHODDropdown] = useState(false);



  // Bar chart data
  const barChartData = {
    labels: ["Colleges", "Departments", "Programs"],
    datasets: [
      {
        label: "Accredited",
        data: [accreditedColleges, accreditedDepartments, accreditedPrograms],
        backgroundColor: "green",
      },
      {
        label: "Pending",
        data: [pendingColleges, pendingDepartments, pendingPrograms],
        backgroundColor: "orange",
      },
    ],
  };

  // Pie chart data for colleges
  const pieChartData = {
    labels: ["Accredited", "Pending"],
    datasets: [
      {
        data: [accreditedColleges, pendingColleges],
        backgroundColor: ["green", "orange"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
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

       {/* Horizontal Menu (Quick Links with Dropdowns) */}
       <nav className="quick-links-nav">
        <ul>
          <li><Link to="/accreditation">Accreditation</Link></li>
          
          <li onMouseEnter={() => setCollegeDropdown(true)} onMouseLeave={() => setCollegeDropdown(false)} style={{ color: "green", fontWeight: "bold" }} >
            College ▾
            {collegeDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/create-college">Create College</Link></li>
                <li><Link to="/update-college">Update College</Link></li>
                <li><Link to="/view-college">View College</Link></li>
              </ul>
            )}
          </li>
          
          <li onMouseEnter={() => setDepartmentDropdown(true)} onMouseLeave={() => setHODDropdown(false)} style={{ color: "green", fontWeight: "bold" }} >
            Department ▾
            {departmentDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/create-department">Create Department</Link></li>
                <li><Link to="/update-department">Update Department</Link></li>
                <li><Link to="/view-department">View Department</Link></li>
              </ul>
            )}
          </li>
          
          <li onMouseEnter={() => setProgramDropdown(true)} onMouseLeave={() => setProgramDropdown(false)} style={{ color: "green", fontWeight: "bold" }} >
            Program ▾
            {programDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/create-program">Create Program</Link></li>
                <li><Link to="/update-program">Update Program</Link></li>
                <li><Link to="/view-program">View Program</Link></li>
              </ul>
            )}
          </li>
          
          <li onMouseEnter={() => setProgramDropdown(true)} onMouseLeave={() => setProgramDropdown(false)} style={{ color: "green", fontWeight: "bold" }} >
          HOD ▾
          {HODDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/add-hod">Assign HOD</Link></li>
              <li><Link to="/view-hod">View HOD</Link></li>
              <li><Link to="/update-hod">Update HOD</Link></li>
            </ul>
            )}
          </li>
          
        </ul>
      </nav>


      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Colleges</h3>
            <p>{colleges} Registered</p>
          </div>
          <div className="stat-card">
            <h3>Departments</h3>
            <p>{departments} Registered</p>
          </div>
          <div className="stat-card">
            <h3>Programs</h3>
            <p>{programs} Registered</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts">
          <div className="chart">
            <h3>Accreditation Status</h3>
            <Bar data={barChartData} />
          </div>
          <div className="chart">
            <h3>College Accreditation</h3>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
