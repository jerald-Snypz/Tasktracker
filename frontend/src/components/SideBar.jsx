import React from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Typography, Box, Divider
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

// Static user data for display
const currentUser = {
  name: 'Admin User',
  role: 'Admin',
  avatar: 'A',
};

const Sidebar = () => {
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
        },
      }}
    >
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
    </Drawer>
  );
};

export default Sidebar;
