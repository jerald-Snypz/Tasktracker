import React, { useState } from "react";
import TaskProgressChart from "./TaskProgressChart";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, project: "Project A", teamMember: "John", dueDate: "2025-06-10", status: "To-Do" },
    { id: 2, project: "Project B", teamMember: "Jane Smith", dueDate: "2025-06-12", status: "In Progress" },
  ]);

  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ project: "", teamMember: "", dueDate: "", status: "To-Do" });
  const [editTask, setEditTask] = useState(null);

  const handleChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });
  const handleStatusChange = (e) => setNewTask({ ...newTask, status: e.target.value });

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    setOpen(false);
    setNewTask({ project: "", teamMember: "", dueDate: "", status: "To-Do" });
  };

  const handleDeleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const handleEditTask = (task) => {
    setEditTask(task);
    setNewTask(task);
    setOpen(true);
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map((task) => (task.id === editTask.id ? newTask : task)));
    setOpen(false);
    setEditTask(null);
    setNewTask({ project: "", teamMember: "", dueDate: "", status: "To-Do" });
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "auto" }}>
      {/* Top Bar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ width: "100%", height: "100%", p: 3, mt: 8 }}>
        {/* Task Progress Chart & Task Details Side by Side */}
        <Grid container spacing={2} sx={{ height: "100%", alignItems: "stretch" }}>
          {/* Task Progress Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Task Progress Overview</Typography>
              <Box sx={{ height: 350 }}>
                <TaskProgressChart tasks={tasks} />
              </Box>
            </Card>
          </Grid>

          {/* Task Details with Edit/Delete */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Task Details</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Team Member</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.project}</TableCell>
                      <TableCell>{task.teamMember}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEditTask(task)}>
                          Edit
                        </Button>
                        <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteTask(task.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>

        {/* Add Task Button */}
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setOpen(true)}>
          Add Task
        </Button>

        {/* Add/Edit Task Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{editTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Project" name="project" value={newTask.project} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Team Member" name="teamMember" value={newTask.teamMember} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Due Date" name="dueDate" type="date" value={newTask.dueDate} onChange={handleChange} sx={{ mt: 2 }} />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select value={newTask.status} onChange={handleStatusChange}>
                <MenuItem value="To-Do">To-Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={editTask ? handleUpdateTask : handleAddTask} color="primary">
              {editTask ? "Update Task" : "Add Task"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard;