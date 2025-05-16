import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskLoader from "../components/Loader"; // adjust the path as needed
import { useTaskContext } from "../contexts/TaskContext";

const Dashboard: React.FC = () => {
  const userData = localStorage.getItem("user_data");
  const [loading, setLoading] = useState(false);
  const { fetchTasks } = useTaskContext();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchTasks();
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [fetchTasks]);

  if (loading) return <TaskLoader message="Loading your dashboard..." />;

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
