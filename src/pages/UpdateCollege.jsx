import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/UpdateCollege.css";
import AppLogo from "../assets/nuc_logox.png";

const UpdateCollege = () => {
  const user = { name: "John Doe" }; // Placeholder for logged-in user data
  const { id } = useParams(); // Get the college ID from URL
  const navigate = useNavigate();

  const [collegeData, setCollegeData] = useState({
    name: "",
    description: "",
    university: "",
    departments: [],
  });

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/colleges/${id}`);
        setCollegeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching college:", error);
        setLoading(false);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/universities");
        setUniversities(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchCollege();
    fetchUniversities();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollegeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/colleges/${id}`, collegeData);
      alert("College updated successfully!");
      navigate("/view-colleges"); // Redirect to college list
    } catch (error) {
      alert("Error updating college");
    }
  };

  if (loading) return <p>Loading college details...</p>;

  return (
    <div className="update-college-container">

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

      <h2>Update College</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>College Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter college name"
            value={collegeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter college description"
            value={collegeData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="input-group">
          <label>University</label>
          <select name="university" value={collegeData.university} onChange={handleChange} required>
            <option value="">Select a university</option>
            {universities.map((uni) => (
              <option key={uni._id} value={uni._id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Update College</button>
      </form>
    </div>
  );
};

export default UpdateCollege;
