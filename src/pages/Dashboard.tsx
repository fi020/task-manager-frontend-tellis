import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Dashboard: React.FC = () => {
  const userData = localStorage.getItem("user_data");

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4">Welcome{userData ? `, ${userData}` : "!"}</Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
