import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import type { Task } from "../types/task";

type Props = {
    task: Task | null;
    onClose: () => void;
};

const TaskDetailDialog: React.FC<Props> = ({ task, onClose }) => {
    return (
        <Dialog open={!!task} onClose={onClose} fullWidth
            maxWidth="md">
            <DialogTitle>{task?.title}</DialogTitle>
            {/* <DialogContent sx={{ overflow: 'visible' }}> */}
            <DialogContent>
                {/* Scrollable description box */}
                <Box
                    sx={{
                        maxHeight: 500, 
                        overflowY: 'auto',
                        mb: 2,
                        pr: 1,
                        p: 2,
                        border: '2px solid',          // adds a 1px solid border
                        borderColor: 'divider',       // uses the theme's divider color for consistency
                        borderRadius: 1, 
                    }}
                >
                    <DialogContentText sx={{ whiteSpace: 'pre-wrap' }}>
                        {task?.description}
                    </DialogContentText>
                </Box>

                {/* Non-scrollable status and date */}
                <DialogContentText>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: task?.completed ? "green" : "orange", fontWeight: 500 }}>
                        {task?.completed ? "Completed" : "Pending"}
                    </span>
                </DialogContentText>

                {task && (
                    <>
                        <DialogContentText sx={{ mt: 1 }}>
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
