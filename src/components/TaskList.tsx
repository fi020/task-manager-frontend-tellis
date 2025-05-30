import React, { useState } from "react";
import { useTaskContext } from "../contexts/TaskContext";
import { Typography, Box } from "@mui/material";
import TaskListItems from "./TaskListItems";
import TaskDetailDialog from "./TaskDetailDialog";
import EditTaskDialog from "./EditTaskDialog";
import type { Task } from "../types/task";

const TaskList: React.FC = () => {
    const { tasks, updateTask } = useTaskContext(); // Ensure `updateTask` exists
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [editTask, setEditTask] = useState<Task | null>(null);

    const handleSaveEdit = (updatedTask: Task) => {
        updateTask(updatedTask._id, updatedTask); // Your context should handle this
        setEditTask(null);
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
                onTaskClick={setSelectedTask}
                onEditClick={setEditTask} // New handler
            />
            <TaskDetailDialog task={selectedTask} onClose={() => setSelectedTask(null)} />
            <EditTaskDialog task={editTask} onClose={() => setEditTask(null)} onSave={handleSaveEdit} />
        </Box>
    );
};

export default TaskList;
