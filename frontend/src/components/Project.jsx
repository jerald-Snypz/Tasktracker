import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Box,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const { title, description, progress, startDate, endDate, status } = project;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, p: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">{title}</Typography>
          <Chip label={status} color="error" size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" mb={2}>{description}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2">Progress</Typography>
          <Typography variant="body2">{progress}%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="caption">{startDate}</Typography>
          <Typography variant="caption">{endDate}</Typography>
        </Box>
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button size="small" sx={{ color: 'green' }} onClick={onEdit}>Edit</Button>
          <Button size="small" sx={{ color: 'red' }} onClick={onDelete}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      title: 'Website Redesign',
      description: 'Complete redesign of company website',
      progress: 65,
      startDate: 'Jun 1, 2023',
      endDate: 'Aug 31, 2023',
      status: 'Completed',
    },
    {
      title: 'Mobile App',
      description: 'Development of new mobile application',
      progress: 30,
      startDate: 'Jul 15, 2023',
      endDate: 'Oct 30, 2023',
      status: 'Completed',
    },
    {
      title: 'Marketing Campaign',
      description: 'Q4 marketing campaign preparation',
      progress: 15,
      startDate: 'Sep 1, 2023',
      endDate: 'Nov 15, 2023',
      status: 'Completed',
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addData, setAddData] = useState({
    title: '',
    description: '',
    progress: 0,
    startDate: '',
    endDate: '',
    status: '',
  });

  const handleDelete = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setEditData({ ...projects[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    const updated = [...projects];
    updated[editIndex] = editData;
    setProjects(updated);
    setEditIndex(null);
    setEditData(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditData(null);
  };

  // Add Project Handlers
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(false);
    setAddData({ title: '', description: '', progress: 0, startDate: '', endDate: '', status: '' });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSave = () => {
    setProjects(prev => [...prev, addData]);
    handleAddClose();
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Projects</Typography>
        <Button variant="contained" color="primary" size="medium" onClick={handleAddOpen}>
          + Add Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProjectCard
              project={project}
              onDelete={() => handleDelete(index)}
              onEdit={() => handleEditOpen(index)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Edit Project Dialog */}
      <Dialog open={editData !== null} onClose={handleEditCancel} fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" fullWidth margin="dense" value={editData?.title || ''} onChange={handleEditChange} />
          <TextField label="Description" name="description" fullWidth margin="dense" value={editData?.description || ''} onChange={handleEditChange} />
          <TextField label="Progress (%)" name="progress" type="number" fullWidth margin="dense" value={editData?.progress || ''} onChange={handleEditChange} />
          <TextField label="Start Date" name="startDate" fullWidth margin="dense" value={editData?.startDate || ''} onChange={handleEditChange} />
          <TextField label="End Date" name="endDate" fullWidth margin="dense" value={editData?.endDate || ''} onChange={handleEditChange} />
          <TextField label="Status" name="status" fullWidth margin="dense" value={editData?.status || ''} onChange={handleEditChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Project Dialog */}
      <Dialog open={addOpen} onClose={handleAddClose} fullWidth>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" fullWidth margin="dense" value={addData.title} onChange={handleAddChange} />
          <TextField label="Description" name="description" fullWidth margin="dense" value={addData.description} onChange={handleAddChange} />
          <TextField label="Progress (%)" name="progress" type="number" fullWidth margin="dense" value={addData.progress} onChange={handleAddChange} />
          <TextField label="Start Date" name="startDate" fullWidth margin="dense" value={addData.startDate} onChange={handleAddChange} />
          <TextField label="End Date" name="endDate" fullWidth margin="dense" value={addData.endDate} onChange={handleAddChange} />
          <TextField label="Status" name="status" fullWidth margin="dense" value={addData.status} onChange={handleAddChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddSave} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
