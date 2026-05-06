import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        const assignedRole = username === 'emilys' ? 'admin' : 'member';
        setUser({ ...data, username });
        setRole(assignedRole);
        localStorage.setItem('user', JSON.stringify({ ...data, username }));
        localStorage.setItem('role', assignedRole);
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (err) {
      console.error('Login error', err);
      alert('Something went wrong');
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
