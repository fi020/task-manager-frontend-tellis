import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
};

type Props = {
    task: Task | null;
    onClose: () => void;
};

const TaskDetailDialog: React.FC<Props> = ({ task, onClose }) => {
    return (
        <Dialog open={!!task} onClose={onClose}>
            <DialogTitle>{task?.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{task?.description}</DialogContentText>
                <DialogContentText>
                    Status: {task?.completed ? "Completed" : "Pending"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDetailDialog;
