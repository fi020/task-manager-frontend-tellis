import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={10}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Task Manager
        </Typography>
        <Typography variant="h6" gutterBottom>
          Manage your daily tasks efficiently and stay productive.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={() => navigate("/register")} sx={{ mr: 2 }}>
            Get Started
          </Button>
          <Button variant="outlined" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
