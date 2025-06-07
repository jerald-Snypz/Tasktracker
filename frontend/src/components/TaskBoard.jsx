import React, { useState } from "react";
import { Grid, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper, TableContainer } from "@mui/material";
import TaskCard from "./TaskCard";
import Addtaskform from "./AddTaskForm";

const mockTasks = [
  { title: "Design Homepage",description:"Designing a homepage involves creating a visually appealing and functional entry point for a website." ,category: "Website Redesign", assignee: "John Doe", dueDate: "Jul 15, 2025", status: "In Progress", priority: "High" },
  { title: "Develop Login API",description: "Developing a Login API involves creating a secure authentication system that allows users to log in to an application.",category: "Mobile App", assignee: "Jane Smith", dueDate: "Aug 10, 2025", status: "To Do", priority: "Medium" },
  { title: "Implement Responsive CSS",description:"Implementing Responsive CSS ensures that a website adapts seamlessly to different screen sizes and devices"
,category: "Website Redesign", assignee: "John Doe", dueDate: "Jul 25, 2025", status: "Done", priority: "High" },
  { title: "Create Marketing Plan", description:"Creating a Marketing Plan involves outlining strategies to promote a product, service, or brand effectively. It serves as a roadmap for reaching target audiences and achieving business goals.",category: "Marketing Campaign", assignee: "Mike Johnson", dueDate: "Sep 20, 2025", status: "To Do", priority: "Low" },
  { title: "App UI Design",description:"App UI design (User Interface design) is the process of crafting the visual and interactive elements of a mobile application. It focuses on how the app looks, feels, and functions to ensure a seamless user experience.", category: "Mobile App", assignee: "Jane Smith", dueDate: "Aug 5, 2025", status: "In Progress", priority: "Medium" },
   { title: "UI design", description: "UI design (User Interface design) focuses on creating visually appealing and user-friendly interfaces for digital products like websites and apps.It involves elements such as layout, typography, colors, and interactive components to enhance user experience.", category: "Website Redesign", assignee: "John Doe", dueDate: "Aug 25, 2025", status: "To Do", priority: "Low" },
];

const TaskBoard = () => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [tasks, setTasks] = useState(mockTasks);

  const [projectFilter, setProjectFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const resetFilters = () => {
    setProjectFilter("");
    setPriorityFilter("");
    setStatusFilter("");
  };

  const filteredTasks = tasks.filter(task =>
    (projectFilter ? task.category === projectFilter : true) &&
    (priorityFilter ? task.priority === priorityFilter : true) &&
    (statusFilter ? task.status === statusFilter : true)
  );

  const handleAddOrUpdateTask = (task) => {
    if (editTask) {
      setTasks(tasks.map(t => t === editTask ? task : t));
      setEditTask(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter(t => t !== taskToDelete));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setOpen(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">Admin-Tasks</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>+ Add Task</Button>
      </Box>

      {/* Filtering UI */}
      <TableContainer component={Paper} sx={{ mb: 3, p: 2 }}>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Project</InputLabel>
            <Select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {["Website Redesign", "Mobile App", "Marketing Campaign"].map((project) => (
                <MenuItem key={project} value={project}>{project}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Priority</InputLabel>
            <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {["Low", "Medium", "High"].map((priority) => (
                <MenuItem key={priority} value={priority}>{priority}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {["To Do", "In Progress", "Done"].map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={resetFilters}>Clear Filters</Button>
        </Box>
      </TableContainer>

      <Grid container spacing={3}>
        {filteredTasks.map((task, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <TaskCard task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
          </Grid>
        ))}
      </Grid>

      <Addtaskform
        open={open}
        handleClose={() => { setOpen(false); setEditTask(null); }}
        onSubmitTask={handleAddOrUpdateTask}
        initialData={editTask}
      />
    </Box>
  );
};

export default TaskBoard;
