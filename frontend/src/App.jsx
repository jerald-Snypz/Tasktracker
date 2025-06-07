// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginFinal from "./components/LoginFinal";
import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Project";
import Team from "./components/Team";
import Tasks from "./components/Tasks";
import './App.css';

const AppWrapper = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/"; // Hide sidebar on login page

  return (
    <div className="app-container">
      {showSidebar && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginFinal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/tasks" element={<Tasks />} />
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
