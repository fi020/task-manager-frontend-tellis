import React, { useState } from "react";
import { useTaskContext } from "../contexts/TaskContext";
import {
    Typography,
    Box,
    Snackbar,
    Button,
} from "@mui/material";
import TaskListItems from "./TaskListItems";
import TaskDetailDialog from "./TaskDetailDialog";

type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
};

type PendingToggle = {
    taskId: string;
    timeoutId: ReturnType<typeof setTimeout>;
};

const TaskList: React.FC = () => {
    const { tasks, toggleTaskCompletion } = useTaskContext();
    const [pendingToggle, setPendingToggle] = useState<PendingToggle | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleCheckboxClick = (taskId: string) => {
        if (pendingToggle) return;

        const timeoutId = setTimeout(() => {
            toggleTaskCompletion(taskId);
            setPendingToggle(null);
        }, 1000);

        setPendingToggle({ taskId, timeoutId });
        setSnackbarOpen(true);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    const handleCloseDialog = () => {
        setSelectedTask(null);
    };

    const handleUndo = () => {
        if (pendingToggle) {
            clearTimeout(pendingToggle.timeoutId);
            setPendingToggle(null);
            setSnackbarOpen(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (tasks.length === 0) {
        return (
            <Typography mt={4} variant="body1" color="textSecondary">
                No tasks found. Add your first task!
            </Typography>
        );
    }

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                Your Tasks
            </Typography>
            <TaskListItems
                tasks={tasks}
                onCheckboxClick={handleCheckboxClick}
                onTaskClick={handleTaskClick}
            />
            <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                message="Task will be marked as completed in 1 second."
                action={
                    <Button color="secondary" size="small" onClick={handleUndo}>
                        UNDO
                    </Button>
                }
                autoHideDuration={1000}
                onClose={handleSnackbarClose}
            />
            <TaskDetailDialog task={selectedTask} onClose={handleCloseDialog} />
        </Box>
    );
};

export default TaskList;
