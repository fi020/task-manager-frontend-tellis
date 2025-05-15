import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Divider,
} from "@mui/material";

type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
};

type Props = {
    tasks: Task[];
    onCheckboxClick: (taskId: string) => void;
    onTaskClick: (task: Task) => void;
};

const TaskListItems: React.FC<Props> = ({ tasks, onCheckboxClick, onTaskClick }) => {
    return (
        <List>
            {tasks.map((task) => (
                <React.Fragment key={task._id}>
                    <ListItem
                        component="button"
                        onClick={() => onTaskClick(task)}
                        sx={(theme) => ({
                            // background color adapts to theme
                            bgcolor: "transparent",
                            color: theme.palette.text.primary,

                            // hover effect depending on theme mode
                            "&:hover": {
                                bgcolor: theme.palette.action.hover,
                            },

                            // remove native button styles
                            border: "none",
                            outline: "none",
                            textAlign: "left",
                            width: "100%",

                            // optionally control focus styles
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
                                e.stopPropagation(); // prevent triggering dialog
                                onCheckboxClick(task._id);
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
