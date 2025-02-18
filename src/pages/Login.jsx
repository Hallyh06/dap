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
        // Store user data & token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoading(false);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={AppLogo} alt="Logo" className="login-logo" />
        <h2 className="login-header">Login</h2>
        <h3 className="login-subtitle">Director of Academic Planning</h3>

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="signup-link">
          <p>Don't have an account?</p>
          <Link to="/add-dap" className="link-to-add-dap">Create a new DAP Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
