import React, { useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Divider,
} from "@mui/material";
import type { Task } from "../types/task";
import { useTaskContext } from "../contexts/TaskContext";
import { useSnackbar } from "../contexts/SnackbarContext"; // Import snackbar context

type Props = {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
};

const TaskListItems: React.FC<Props> = ({ tasks, onTaskClick }) => {
    const { toggleTaskCompletion } = useTaskContext();
    const { showUndoSnackbar } = useSnackbar();

    const handleCheckboxClick = (taskId: string) => {
        showUndoSnackbar(taskId, "Task will be marked as completed in 5 seconds.", 5000);
    };
    const [pendingToggle, setPendingToggle] = useState<{
        taskId: string;
        timeoutId: ReturnType<typeof setTimeout>;
    } | null>(null);

    // const handleCheckboxClick = (taskId: string) => {
    //     // if (pendingToggle) return;

    //     console.log(`confirm is ${confirmUndo}`);
    //     const timeoutId = setTimeout(() => {
    //         if (!confirmUndo) {
    //             console.log(`confirm is ${confirmUndo} and toggel is called`);
    //             toggleTaskCompletion(taskId);
    //             setPendingToggle(null);
    //         }
    //     }, 5000);

    //     setPendingToggle({ taskId, timeoutId });
    //     openSnackbar(`${taskId} Task will be marked as completed in 5 second.`, 3000);
    // };

    return (
        <List>
            {tasks.map((task) => (
                <React.Fragment key={task._id}>
                    <ListItem
                        component="button"
                        onClick={() => onTaskClick(task)}
                        sx={(theme) => ({
                            bgcolor: "transparent",
                            color: theme.palette.text.primary,
                            "&:hover": {
                                bgcolor: theme.palette.action.hover,
                            },
                            border: "none",
                            outline: "none",
                            textAlign: "left",
                            width: "100%",
                            "&:focus-visible": {
                                outline: `2px solid ${theme.palette.primary.main}`,
                                outlineOffset: 2,
                            },
                        })}
                    >
                        <Checkbox
                            edge="start"
                            checked={task.completed}
                            disableRipple
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCheckboxClick(task._id);
                            }}
                        />
                        <ListItemText
                            primary={task.title}
                            secondary={task.description}
                            primaryTypographyProps={{
                                style: {
                                    textDecoration: task.completed ? "line-through" : "none",
                                },
                            }}
                        />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default TaskListItems;
