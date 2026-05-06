import React, { useEffect, useState, useMemo } from 'react';
import { useTasks } from '../context/TasksContext';
import './Team.css';

export default function Team() {
  const { tasks } = useTasks();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Count assigned tasks per user
  const taskSummary = useMemo(() => {
    const counts = {};
    tasks.forEach(t => {
      const member = t.assignedTo || "Unassigned";
      if (!counts[member]) {
        counts[member] = { assigned: 0 };
      }
      counts[member].assigned++;
    });
    return counts;
  }, [tasks]);

  if (loading) return <h2>Loading team members...</h2>;

  return (
    <div className="team-container">
      <h1>Team Page (Admin only)</h1>
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>No. of Assigned Tasks</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const key = user.firstName; // match by firstName
            const summary = taskSummary[key] || { assigned: 0 };
            return (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{summary.assigned}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
