import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Dashboard</h1>
      </header>
      <nav>
        <ul>
          <li><Link to="/hod-management">Manage HODs</Link></li>
          <li><Link to="/accreditation">Accreditation</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;