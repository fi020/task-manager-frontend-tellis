import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";
import type { ReactNode } from "react";

import React from "react";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                  {/* <Route path="/" element={<Dashboard />} /> */}
                  {/* <div>Dashboard Page – Tasks will be listed here</div> */}
                </ProtectedRoute>
              }
            />
            <Route path="/add-task" element={<div>Add Task Page</div>} />
            <Route path="/edit-task/:id" element={<div>Edit Task Page</div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>

  );
};

export default App;
