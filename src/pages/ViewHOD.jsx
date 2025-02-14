import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewHOD = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/programs');
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div>
      <h2>View Programs</h2>
      <ul>
        {programs.map((program) => (
          <li key={program._id}>
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <p>{program.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewHOD;
