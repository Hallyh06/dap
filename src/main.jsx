import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HODManagement from './pages/HODManagement';
import Accreditation from './pages/Accreditation';
import AddDap from './pages/AddDap'; // Import AddDap component
import CreateCollege from "./pages/CreateCollege";
import CreateDepartment from "./pages/CreateDepartment";
import CreateProgram from "./pages/CreateProgram";
import './index.css';
import ViewProgram from './pages/ViewProgram';
import UpdateProgram from './pages/UpdateProgram';
import ViewCollege from './pages/ViewCollege';
import UpdateCollege from './pages/UpdateCollege';
import UpdateDepartment from "./pages/UpdateDepartment";
import ViewDepartment from "./pages/ViewDepartment";
import AddHOD from './pages/AddHOD';
import ViewHOD from './pages/ViewHOD';
import UpdateHOD from './pages/UpdateHOD';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hod-management" element={<HODManagement />} />
        <Route path="/accreditation" element={<Accreditation />} />
        <Route path="/add-dap" element={<AddDap />} /> {/* Define the route for AddDap */}
        <Route path="/create-college" element={<CreateCollege />} />
        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/update-department/:departmentId" element={<UpdateDepartment />} />
        <Route path="/create-program" element={<CreateProgram />} />
        <Route path='/view-program' element={<ViewProgram />} />
        <Route path='/update-program' element={<UpdateProgram />} />
        <Route path='/view-college' element={<ViewCollege />} />
        <Route path="/view-department" element={<ViewDepartment />} />
        <Route path='/update-college' element={<UpdateCollege />} />
        <Route path='/add-hod' element={<AddHOD />} />
        <Route path='/view-hod' element={<ViewHOD />} />
        <Route path='/update-hod' element={<UpdateHOD />} />
      </Routes>
    </Router>
  </React.StrictMode>
);