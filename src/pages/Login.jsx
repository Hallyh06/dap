import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppLogo from "../assets/nuc_logox.png";
import '../styles/Login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
  <div className="login-box">
    <img src={AppLogo} alt="Logo" />
    <h2 className="login-header">Login</h2>
    <h3 className="login-subtitle">Director of Academic Planning</h3>
    <form onSubmit={handleLogin} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>

    {/* Link to AddDap page */}
    <div className="signup-link">
        <p>Don't have an account?</p>
        <Link to="/add-dap" className="link-to-add-dap">Create a new DAP Account</Link>
      </div>

  </div>
</div>
  );
}

export default Login;
