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
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">{title}</Typography>
          <Chip label={status} color="error" size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

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

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Projects</Typography>
        <Button variant="contained" color="primary" size="medium">+ Add Project</Button>
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

      {/* Edit Dialog */}
      <Dialog open={editData !== null} onClose={handleEditCancel} fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={editData?.title || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={editData?.description || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Progress (%)"
            name="progress"
            type="number"
            fullWidth
            value={editData?.progress || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Start Date"
            name="startDate"
            fullWidth
            value={editData?.startDate || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="End Date"
            name="endDate"
            fullWidth
            value={editData?.endDate || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            fullWidth
            value={editData?.status || ''}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
