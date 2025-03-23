// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin, switchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });
      onLogin(res.data.token, res.data.role);

      if (rememberMe) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">ECHO</h1>
      <p className="app-subtitle">Student Society Portal</p>

      <div className="login-card">
        <div className="login-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="User Icon"
          />
        </div>
        <h2 className="login-header">MEMBER LOGIN</h2>

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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#forgot" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>

        <p style={{ marginTop: '10px' }}>
          Don't have an account?{' '}
          <a href="#signup" onClick={switchToSignup}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
