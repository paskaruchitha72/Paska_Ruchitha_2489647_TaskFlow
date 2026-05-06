import React, { useState, useMemo, useEffect } from 'react';
import { useTasks } from '../context/TasksContext';
import './Tasks.css';

export default function TasksPage() {
  const { tasks, addTask, deleteTask } = useTasks();
  const [tab, setTab] = useState('All');
  const [newTask, setNewTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users from API for assignment dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  // Filtering logic
  const filtered = useMemo(() => {
    if (tab === 'All') {
      return tasks.filter(t => t.status === 'Backlog');
    }
    return tasks.filter(t => t.status === tab);
  }, [tasks, tab]);

  const handleAdd = (status) => {
    if (!newTask.trim() || !assignedTo) return;
    addTask({ id: Date.now(), todo: newTask, assignedTo }, status);
    setNewTask('');
    setAssignedTo('');
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>

      {/* Tabs */}
      <div className="tabs">
        {['All','Backlog','In Progress','In Review','Done'].map(s => (
          <button
            key={s}
            className={tab === s ? 'active' : ''}
            onClick={() => setTab(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Add Task Form */}
      <div className="add-task-form">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <select
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
        >
          <option value="">Assign to...</option>
          {users.map(user => (
            <option key={user.id} value={user.firstName}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
        <div className="status-buttons">
          <button onClick={() => handleAdd('Backlog')}>Add to Backlog</button>
          <button onClick={() => handleAdd('In Progress')}>Add to In Progress</button>
          <button onClick={() => handleAdd('In Review')}>Add to In Review</button>
          <button onClick={() => handleAdd('Done')}>Add to Done</button>
        </div>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filtered.map(t => (
          <li key={t.id} className="task-item">
            {t.todo} <em>({t.assignedTo})</em>
            {(t.status === 'In Progress' || t.status === 'In Review' || t.status === 'Done') && (
              <button className="delete-btn" onClick={() => deleteTask(t.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
