import React, { useState } from "react";

const FetchLecturers = () => {
  const [email, setEmail] = useState("");
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState("");

  const fetchStaffDetails = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }
    
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:5000/api/nucstaffs/fetch-staff?email=${email}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error fetching staff details");
        setStaff(null);
      } else {
        setStaff(data);
      }
    } catch (err) {
      setError("Failed to connect to the server");
      setStaff(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fetch Lecturer Details</h2>
      
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={fetchStaffDetails} style={{ padding: "10px", cursor: "pointer" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {staff && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
          <h3>Staff Details</h3>
          <p><strong>Title:</strong> {staff.title}</p>
          <p><strong>Name:</strong> {staff.firstname} {staff.middlename} {staff.lastname}</p>
          <p><strong>Designation:</strong> {staff.designation}</p>
          <p><strong>Email:</strong> {staff.emailaddress}</p>
          <p><strong>Phone:</strong> {staff.phonenumber}</p>
          <p><strong>Status:</strong> {staff.status ? "Active" : "Inactive"}</p>
        </div>
      )}
    </div>
  );
};

export default FetchLecturers;
