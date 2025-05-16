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
    const { tasks } = useTaskContext();
    // const { openSnackbar } = useSnackbar(); // use snackbar context
    const [pendingToggle, setPendingToggle] = useState<PendingToggle | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
