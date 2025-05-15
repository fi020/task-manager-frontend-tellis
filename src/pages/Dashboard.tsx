import React from "react";
import { Container, Typography, Box } from "@mui/material";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

const Dashboard: React.FC = () => {
  const userData = localStorage.getItem("user_data");

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4">
          Welcome{userData ? `, ${userData}` : "!"}
        </Typography>
        <AddTask />
        <TaskList />

      </Box>
    </Container>
  );
};

export default Dashboard;
