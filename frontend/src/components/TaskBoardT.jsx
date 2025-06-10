import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TableContainer,
} from "@mui/material";
import TaskCardT from "./TaskCardT";
import AddtaskformT from "./AddtaskformT";

const mockTasks = [
  {
    title: "Design Homepage",
    description: "Creating a homepage UI",
    category: "UI/UX",
    assignee: "John Doe",
    dueDate: "2025-07-15",
    status: "In Progress",
  },
  {
    title: "Responsive CSS",
    description: "Responsive website layout",
    category: "Frontend",
    assignee: "Jane Doe",
    dueDate: "2025-07-25",
    status: "Done",
  },
  {
    title: "UI Design",
    description: "Wireframes and user flow",
    category: "UI/UX",
    assignee: "Mike",
    dueDate: "2025-08-25",
    status: "To Do",
  },
];

const TaskBoardT = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const resetFilters = () => {
    setStatusFilter("");
  };

  const filteredTasks = tasks.filter(
    (task) => !statusFilter || task.status === statusFilter
  );

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? updatedTask : task
    );
    setTasks(updatedTasks);
    setOpenEdit(false);
    setSelectedTask(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Team Member Tasks
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3, p: 2 }}>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={resetFilters}>
            Clear Filters
          </Button>
        </Box>
      </TableContainer>

      <Grid container spacing={3}>
        {filteredTasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TaskCardT task={task} onEdit={handleEditTask} />
          </Grid>
        ))}
      </Grid>

      <AddtaskformT
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
          setSelectedTask(null);
        }}
        onSubmitTask={handleUpdateTask}
        initialData={selectedTask}
      />
    </Box>
  );
};

export default TaskBoardT;
