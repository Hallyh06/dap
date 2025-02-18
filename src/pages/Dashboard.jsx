import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; 
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "../styles/Dashboard.css";
import AppLogo from "../assets/nuc_logox.png";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const location = useLocation(); // Hook to access location object
  const { universityName } = location.state || {}; // Get university name from state

  const user = { name: "John Doe" }; // Placeholder for logged-in user data

  // State to hold data fetched from the backend
  const [university, setUniversity] = useState('');
  const [dapName, setDapName] = useState('');
  const [collegesCount, setCollegesCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);

  const [accreditedColleges, setAccreditedColleges] = useState(0);
  const [pendingColleges, setPendingColleges] = useState(0);
  const [accreditedDepartments, setAccreditedDepartments] = useState(0);
  const [pendingDepartments, setPendingDepartments] = useState(0);
  const [accreditedPrograms, setAccreditedPrograms] = useState(0);
  const [pendingPrograms, setPendingPrograms] = useState(0);

  const [collegeDropdown, setCollegeDropdown] = useState(false);
  const [programDropdown, setProgramDropdown] = useState(false);
  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [HODDropdown, setHODDropdown] = useState(false);

  useEffect(() => {
    // Fetch university and dashboard data
    axios
      .get("/api/dashboard")
      .then((response) => {
        const {
          universityName,
          dapName,
          collegesCount,
          accreditedColleges,
          pendingColleges,
          departmentsCount,
          accreditedDepartments,
          pendingDepartments,
          programsCount,
          accreditedPrograms,
          pendingPrograms
        } = response.data;

        setUniversity(universityName);  // New state for university name
        setDapName(dapName);
        setCollegesCount(collegesCount);
        setDepartmentsCount(departmentsCount);
        setProgramsCount(programsCount);

        setAccreditedColleges(accreditedColleges);
        setPendingColleges(pendingColleges);
        setAccreditedDepartments(accreditedDepartments);
        setPendingDepartments(pendingDepartments);
        setAccreditedPrograms(accreditedPrograms);
        setPendingPrograms(pendingPrograms);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const barChartData = {
    labels: ["Colleges", "Departments", "Programs"],
    datasets: [
      {
        label: "Registered",
        data: [collegesCount, departmentsCount, programsCount],
        backgroundColor: "green",
      },
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
      <header className="dashboard-header" style={{ backgroundColor: 'green', borderRadius: '0px' }}>
        <div className="logo-title">
          <img src={AppLogo} alt="Logo" style={{ width: '100px', height: '100px' }} />
          <h2>NUC Accreditation System</h2> {/* Display University Name */}
        </div>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <center><h2>{universityName}</h2></center>

      {/* Horizontal Menu (Quick Links with Dropdowns) */}
      <nav className="quick-links-nav">
        <ul>
          <li><Link to="/accreditation">Accreditation</Link></li>
          <li onMouseEnter={() => setCollegeDropdown(true)} onMouseLeave={() => setCollegeDropdown(false)} style={{ color: "green", fontWeight: "bold" }}>
            College ▾
            {collegeDropdown && (
              <ul className="dropdown-menu">
                <li><Link to={`/create-college/${university}`}>Create College</Link></li> {/* Link to create college */}
                <li><Link to="/update-college">Update College</Link></li>
                <li><Link to="/view-college">View College</Link></li>
              </ul>
            )}
          </li>

          <li onMouseEnter={() => setDepartmentDropdown(true)} onMouseLeave={() => setDepartmentDropdown(false)} style={{ color: "green", fontWeight: "bold" }}>
            Department ▾
            {departmentDropdown && (
              <ul className="dropdown-menu">
                <li><Link to={`/create-department/${university}`}>Create Department</Link></li> {/* Link to create department */}
                <li><Link to="/update-department">Update Department</Link></li>
                <li><Link to="/view-department">View Department</Link></li>
              </ul>
            )}
          </li>

          <li onMouseEnter={() => setProgramDropdown(true)} onMouseLeave={() => setProgramDropdown(false)} style={{ color: "green", fontWeight: "bold" }}>
            Program ▾
            {programDropdown && (
              <ul className="dropdown-menu">
                <li><Link to={`/create-program/${university}`}>Create Program</Link></li> {/* Link to create program */}
                <li><Link to="/update-program">Update Program</Link></li>
                <li><Link to="/view-program">View Program</Link></li>
              </ul>
            )}
          </li>

          <li onMouseEnter={() => setHODDropdown(true)} onMouseLeave={() => setHODDropdown(false)} style={{ color: "green", fontWeight: "bold" }}>
            HOD ▾
            {HODDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/add-hod">Assign HOD</Link></li>
                <li><Link to="/view-hod">View HOD</Link></li>
                <li><Link to="/update-hod">Update HOD</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/fetch_lecturers">Lecturers</Link></li>

        </ul>
      </nav>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        <div className="stats-overview">
          <div className="stat-card">
            <h2>Colleges</h2>
            <p style={{ color: "black" }}>{collegesCount} Registered</p>
            <p>Accredited: {accreditedColleges}</p>
            <p>Pending: {pendingColleges}</p>
          </div>
          <div className="stat-card">
            <h2>Departments</h2>
            <p style={{ color: "black" }}>{departmentsCount} Registered</p>
            <p>Accredited: {accreditedDepartments}</p>
            <p>Pending: {pendingDepartments}</p>
          </div>
          <div className="stat-card">
            <h2>Programs</h2>
            <p style={{ color: "black" }}>{programsCount} Registered</p>
            <p>Accredited: {accreditedPrograms}</p>
            <p>Pending: {pendingPrograms}</p>
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
