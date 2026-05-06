import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch initial tasks from DummyJSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/todos');
        const data = await res.json();
        // Default all fetched tasks into Backlog
        const withStatus = data.todos.map(t => ({
          ...t,
          status: 'Backlog'
        }));
        setTasks(withStatus);
      } catch (err) {
        console.error('Error fetching tasks', err);
      }
    };
    fetchData();
  }, []);

  // Add a new task with rules
  const addTask = useCallback((task, status = 'Backlog') => {
    if (status === 'Backlog') {
      // New tasks go into Backlog (and show in All by filtering)
      setTasks(prev => [...prev, { ...task, status: 'Backlog' }]);
    } else if (status === 'In Progress' || status === 'In Review') {
      // Only add to their specific status
      setTasks(prev => [...prev, { ...task, status }]);
    } else if (status === 'Done') {
      // Only add to Done
      setTasks(prev => [...prev, { ...task, status: 'Done' }]);
    }
  }, []);

  // Update an existing task
  const updateTask = useCallback((id, updates) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  // Move a task to a new status
  const moveTask = useCallback((id, newStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  }, []);

  // Delete a task
  const deleteTask = useCallback(id => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, moveTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
