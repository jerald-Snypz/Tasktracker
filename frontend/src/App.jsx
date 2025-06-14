import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import LoginFinal from "./components/LoginFinal";
import Sidebar from "./components/SideBar";
import SidebarT from "./components/SidebarT";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Project";
import Team from "./components/Team";
import Tasks from "./components/Tasks";
import UserviewT from "./components/UserviewT";

import './App.css';

const AppWrapper = () => {
  const location = useLocation();
  const showAdminSidebar = location.pathname !== "/";
  const isTeamDashboard = location.pathname.startsWith("/team-");

  return (
    <div className="app-container">
      <CssBaseline />

      {/* Conditional sidebars */}
      {showAdminSidebar && !isTeamDashboard && <Sidebar />}
      {showAdminSidebar && isTeamDashboard && <SidebarT />}

      <div className="main-content">
        <Routes>
          {/* Common route */}
          <Route path="/" element={<LoginFinal />} />

          {/* Admin routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/tasks" element={<Tasks />} />

          {/* Team member routes */}
          <Route path="/team-dashboard" element={<Dashboard />} />
          <Route path="/team-tasks" element={<UserviewT />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
