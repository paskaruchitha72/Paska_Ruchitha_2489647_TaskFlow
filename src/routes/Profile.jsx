import React from 'react';
import { useAuth } from '../context/AuthContext';

 function Profile() {
  const { role, setRole } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      <p>Current role: {role}</p>
      <button onClick={() => setRole(role === 'admin' ? 'member' : 'admin')}>
        Switch Role
      </button>
    </div>
  );
}
export default Profile;
