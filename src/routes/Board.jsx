import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useTasks } from '../context/TasksContext';
import './Board.css';

export default function BoardPage() {
  const { tasks, moveTask, addTask } = useTasks();
  const statuses = ['Backlog','In Progress','In Review','Done'];

  return (
    <DndContext onDragEnd={({ active, over }) => {
      if (over) moveTask(active.id, over.id);
    }}>
      <div className="board">
        {statuses.map(status => (
          <Column
            key={status}
            id={status}
            tasks={tasks.filter(t => t.status === status)}
            addTask={status === 'Backlog' ? addTask : null}
          />
        ))}
      </div>
    </DndContext>
  );
}

function Column({ id, tasks, addTask }) {
  const { setNodeRef } = useDroppable({ id });
  const [newTask, setNewTask] = useState('');

  const handleAdd = e => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask({ id: Date.now(), todo: newTask });
    setNewTask('');
  };

  return (
    <div ref={setNodeRef} className="column">
      <h2>{id}</h2>

      {/* Only show add form in Backlog */}
      {addTask && (
        <form onSubmit={handleAdd} className="add-task-form">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="New task..."
          />
          <button type="submit">Add</button>
        </form>
      )}

      {tasks.map(t => <Card key={t.id} task={t} />)}
    </div>
  );
}

function Card({ task }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="card">
      {task.todo}
    </div>
  );
}
