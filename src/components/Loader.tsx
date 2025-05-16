// components/TaskLoader.tsx
import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";

interface TaskLoaderProps {
    message?: string;
}

const TaskLoader: React.FC<TaskLoaderProps> = ({ message = "Loading..." }) => {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgcolor="rgba(255, 255, 255, 0.85)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            zIndex={9999}
        >
            <TaskIcon sx={{ fontSize: 50, color: "#1976d2", mb: 1 }} />
            <CircularProgress size={60} thickness={4} sx={{ color: "#1976d2" }} />
            <Typography mt={2} fontWeight="medium">
                {message}
            </Typography>
        </Box>
    );
};

export default TaskLoader;
