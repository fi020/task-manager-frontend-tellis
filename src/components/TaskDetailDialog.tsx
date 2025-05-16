import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import type { Task } from "../types/task";

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
                    <strong>Status:</strong>{" "}
                    <span style={{ color: task?.completed ? "green" : "orange", fontWeight: 500 }}>
                        {task?.completed ? "Completed" : "Pending"}
                    </span>
                </DialogContentText>
                {task && (
                    <>
                        <br />
                        <DialogContentText style={{ marginTop: 8 }}>
                            <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
                        </DialogContentText>
                    </>
                )}
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
