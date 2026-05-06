// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { logout, role } = useAuth();

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>
      <div className={`sidebar ${open ? 'open' : ''}`}>
        <h2 className="sidebar-title">TaskFlow</h2>
        <nav>
          <ul>
            <li><Link to="/tasks" onClick={() => setOpen(false)}>Tasks</Link></li>
            <li><Link to="/board" onClick={() => setOpen(false)}>Board</Link></li>
            <li><Link to="/profile" onClick={() => setOpen(false)}>Profile</Link></li>
            {role === 'admin' && (
              <li><Link to="/team" onClick={() => setOpen(false)}>Team</Link></li>
            )}
          </ul>
        </nav>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </>
  );
}
