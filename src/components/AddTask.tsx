import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useTaskContext } from "../contexts/TaskContext";

const AddTask: React.FC = () => {
    const { addTask } = useTaskContext();

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        completed: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        console.log("Form submitted:", formData);
        await addTask({
            title: formData.title,
            description: formData.description,
            completed: formData.completed,
        });
        setFormData({ title: "", description: "", completed: false });
        handleClose();
    };

    return (
        <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Task
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">

                {/* <Dialog open={open} onClose={handleClose}> */}
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        name="title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        // rows={3}
                        maxRows={20}
                        minRows={5}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.completed}
                                onChange={handleChange}
                                name="completed"
                            />
                        }
                        label="Complete"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddTask;
