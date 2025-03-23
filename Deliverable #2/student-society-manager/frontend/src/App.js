// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (jwtToken, userRole) => {
    setToken(jwtToken);
    setRole(userRole);
    // Optionally store token in localStorage
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('role', userRole);
  };

  const switchToSignup = () => {
    setShowLogin(false);
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  return (
    <div>
      {!token ? (
        showLogin ? (
          <Login onLogin={handleLogin} switchToSignup={switchToSignup} />
        ) : (
          <Signup switchToLogin={switchToLogin} />
        )
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Welcome to ECHO!</h1>
          <p>Your role is: {role}</p>
          {/* Protected content can go here */}
        </div>
      )}
    </div>
  );
}

export default App;
