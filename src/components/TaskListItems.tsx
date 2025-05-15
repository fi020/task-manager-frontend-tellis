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
                    <ListItem button onClick={() => onTaskClick(task)}>
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
