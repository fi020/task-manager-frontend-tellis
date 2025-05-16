import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Divider,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Task } from "../types/task";
import { useSnackbar } from "../contexts/SnackbarContext";

type Props = {
    tasks: Task[];
    onTaskClick: (task: Task) => void;
    onEditClick: (task: Task) => void; // New prop
};

const TaskListItems: React.FC<Props> = ({ tasks, onTaskClick, onEditClick }) => {
    const { showUndoSnackbar } = useSnackbar();

    const handleCheckboxClick = (task: Task) => {
        showUndoSnackbar(task._id, `${task.title} will be marked as ${task.completed ? "incomplete" : "complete"}`, 5000);
    };

    return (
        <List>
            {tasks.map((task) => (
                <React.Fragment key={task._id}>
                    <ListItem
                        component="div"
                        sx={(theme) => ({
                            bgcolor: "transparent",
                            color: theme.palette.text.primary,
                            "&:hover": {
                                bgcolor: theme.palette.action.hover,
                            },
                            width: "100%",
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
                                sx: {
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                },
                            }}
                            secondaryTypographyProps={{
                                sx: {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                },
                            }}
                            onClick={() => onTaskClick(task)}
                            sx={{ cursor: "pointer" }}
                        />
                        <IconButton onClick={() => onEditClick(task)} edge="end">
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default TaskListItems;
