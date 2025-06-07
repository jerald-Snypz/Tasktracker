import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { Box } from '@mui/material';

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Navigate to="/" />;

  if (user.role !== 'admin') {
    return (
      <Box sx={{ p: 4 }}>
        <h2>Access Denied: Admins only</h2>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
