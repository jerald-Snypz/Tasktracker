const express = require('express');
const cors = require('cors');
const Task = require('./model/taskModel');
require('./connection');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ✅ GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});

// ✅ ADD a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err });
  }
});

// ✅ UPDATE a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
});

// ✅ DELETE a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
