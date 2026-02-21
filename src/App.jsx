import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MySkills from "./pages/Myskills";
import MyProjects from "./pages/MyProjects";
import FindTeammates from "./pages/FindTeammates";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Home Page - Always Open First */}
        <Route path="/" element={<Home />} />

        {/* Login & Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/skills" element={
          <PrivateRoute><MySkills /></PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />

        <Route path="/projects" element={
          <PrivateRoute><MyProjects /></PrivateRoute>
        } />

        <Route path="/find-teammates" element={
          <PrivateRoute><FindTeammates /></PrivateRoute>
        } />

        <Route path="/messages" element={
          <PrivateRoute><Messages /></PrivateRoute>
        } />

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
