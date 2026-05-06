import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await login(username, password);
    navigate('/tasks'); // redirect after login
  };

  return (
    <div className="login-container">
      <div className="login-preview">
        <span>Team Tasks App</span>
      </div>
      <div className="login-form-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
