import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskBoard from './TaskBoard';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Task Manager</h2>
      <AddTaskForm onAdd={handleAddTask} />
      <TaskBoard tasks={tasks} />
    </div>
  );
};

export default Tasks;
