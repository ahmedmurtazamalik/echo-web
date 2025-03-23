// src/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Signup = ({ switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('society'); // default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/auth/register', {
        username,
        email,
        password,
        role,
      });
      setSuccess('Registration successful! Please login.');
      setError('');
    } catch (err) {
      console.log(err); // Debugging
      setError(err.response?.data?.message || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">ECHO</h1>
      <p className="app-subtitle">Student Society Portal</p>

      <div className="login-card">
        <h2 className="login-header">SIGN UP</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Register as:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="society"
                  checked={role === 'society'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Society
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Student
              </label>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p style={{ color: 'green', fontSize: '0.9rem' }}>{success}</p>}

          <button type="submit" className="login-button">
            SIGN UP
          </button>
        </form>

        <p style={{ marginTop: '10px' }}>
          Already have an account?{' '}
          <a href="#login" onClick={switchToLogin}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
