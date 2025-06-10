import React from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Typography, Box, Divider, Button
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LogoutIcon from '@mui/icons-material/Logout';

// Static user data for display
const currentUser = {
  name: 'Admin User',
  role: 'Admin',
  avatar: 'A',
};

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage/session data
    localStorage.removeItem('user'); // or sessionStorage.removeItem('user')
    localStorage.removeItem('token'); // optional: if you store JWT or similar
    // Navigate to login page
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Projects', icon: <FolderIcon />, path: '/projects' },
    { label: 'Team', icon: <GroupIcon />, path: '/team' },
    { label: 'Tasks', icon: <AssignmentTurnedInIcon />, path: '/tasks' },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 255,
        '& .MuiDrawer-paper': {
          width: 255,
          boxSizing: 'border-box',
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // push logout to bottom
        },
      }}
    >
      <Box>
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold" color="#1da1f2" align='left'>TaskTrack Pro</Typography>
          <Typography variant="body2" color="textSecondary" align='left'>Project Management System</Typography>
        </Box>
        <Divider />

        <Box p={2} display="flex" alignItems="center">
          <Avatar sx={{ mr: 1, bgcolor: '#1da1f2' }}>
            {currentUser.avatar}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="600">
              {currentUser.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {currentUser.role}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': {
                  backgroundColor: '#e0e0e0',
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: '#1976d2',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Logout Button at the Bottom */}
      <Box p={2}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
