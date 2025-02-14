import React, { useState, useEffect } from 'react';
//import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateHOD = () => {
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [programDate, setProgramDate] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/programs/${id}`);
        const program = response.data;
        setProgramName(program.name);
        setProgramDescription(program.description);
        setProgramDate(program.date);
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };

    fetchProgram();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProgramData = {
      name: programName,
      description: programDescription,
      date: programDate,
    };

    try {
      await axios.put(`http://localhost:5000/api/programs/${id}`, updatedProgramData);
      alert('Program updated successfully!');
      history.push('/view-program');
    } catch (error) {
      console.error('Error updating program:', error);
      alert('Failed to update program');
    }
  };

  return (
    <div>
      <h2>Update Program</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Program Name:</label>
          <input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Program Description:</label>
          <textarea
            value={programDescription}
            onChange={(e) => setProgramDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Program Date:</label>
          <input
            type="date"
            value={programDate}
            onChange={(e) => setProgramDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Program</button>
      </form>
    </div>
  );
};

export default UpdateHOD;
