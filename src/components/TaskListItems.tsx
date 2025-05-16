import React, { useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Divider,
} from "@mui/material";
import type { Task} from "../types/task";
import { useSnackbar } from "../contexts/SnackbarContext"; // Import snackbar context
import { useTaskContext } from "../contexts/TaskContext";

type Props = {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
};

const TaskListItems: React.FC<Props> = ({ tasks, onTaskClick }) => {
    const { showUndoSnackbar } = useSnackbar();
    const { toggleTaskCompletion } = useTaskContext();

    const handleCheckboxClick = (task:Task) => {
        // console.log("Checkbox clicked for task:", task);
        showUndoSnackbar(task._id, `Task ${task.title} will be marked as completed in 5 seconds.`, 5000);
        // toggleTaskCompletion(task._id)
    };
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
                                handleCheckboxClick(task);
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
