const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: String,
  project: String,
  assignedTo: String,
  dueDate: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
});

module.exports = mongoose.model('tasks', taskSchema);

