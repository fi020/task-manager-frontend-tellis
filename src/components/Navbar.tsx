import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Task Manager
          </Link>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ThemeToggleButton />
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
