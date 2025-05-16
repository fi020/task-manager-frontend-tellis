import React, { useState } from "react";
import { useTaskContext } from "../contexts/TaskContext";
import { Typography, Box } from "@mui/material";
import TaskListItems from "./TaskListItems";
import TaskDetailDialog from "./TaskDetailDialog";
import { useSnackbar } from "../contexts/SnackbarContext"; // import hook
import type { Task } from "../types/task";

type PendingToggle = {
    taskId: string;
    timeoutId: ReturnType<typeof setTimeout>;
};

const TaskList: React.FC = () => {
    const { tasks, toggleTaskCompletion } = useTaskContext();
    // const { openSnackbar } = useSnackbar(); // use snackbar context
    const [pendingToggle, setPendingToggle] = useState<PendingToggle | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // const handleCheckboxClick = (taskId: string) => {
    //     if (pendingToggle) return;

    //     const timeoutId = setTimeout(() => {
    //         toggleTaskCompletion(taskId);
    //         setPendingToggle(null);
    //     }, 1000);

    //     setPendingToggle({ taskId, timeoutId });
    //     openSnackbar("Task will be marked as completed in 2e second.", 3000);
    // };

    // const handleUndo = () => {
    //     if (pendingToggle) {
    //         clearTimeout(pendingToggle.timeoutId);
    //         setPendingToggle(null);
    //         // You can add more undo logic here if needed
    //     }
    // };

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
                onTaskClick={setSelectedTask}
            />
            <TaskDetailDialog task={selectedTask} onClose={() => setSelectedTask(null)} />
        </Box>
    );
};

export default TaskList;
