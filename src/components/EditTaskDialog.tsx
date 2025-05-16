import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import type { Task } from "../types/task";

type Props = {
    task: Task | null;
    onClose: () => void;
    onSave: (updatedTask: Task) => void;
};

const EditTaskDialog: React.FC<Props> = ({ task, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setCompleted(task.completed);
        }
    }, [task]);

    const handleSave = () => {
        if (task) {
            onSave({ ...task, title, description, completed });
        }
    };

    return (
        <Dialog open={!!task} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    // rows={30}
                    maxRows={20}
                    minRows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    }
                    label="Completed"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskDialog;
