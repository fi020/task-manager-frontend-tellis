import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import UndoSnackbar from "../components/UndoSnackbar";
import { useTaskContext } from "./TaskContext";

type SnackbarContextType = {
    showUndoSnackbar: (taskId: string, message: string, delay?: number) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { toggleTaskCompletion } = useTaskContext();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [pendingToggle, setPendingToggle] = useState<{
        taskId: string;
        timeoutId: ReturnType<typeof setTimeout>;
    } | null>(null);

    const showUndoSnackbar = (taskId: string, msg: string, delay = 5000) => {
        setMessage(msg);
        setOpen(true);

        const timeoutId = setTimeout(() => {
            toggleTaskCompletion(taskId);
            setPendingToggle(null);
        }, delay);

        setPendingToggle({ taskId, timeoutId });
    };

    const handleUndo = () => {
        if (pendingToggle) {
            clearTimeout(pendingToggle.timeoutId);
            setPendingToggle(null);
        }
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showUndoSnackbar }}>
            {children}
            <UndoSnackbar
                open={open}
                message={message}
                autoHideDuration={5000}
                onUndo={handleUndo}
                onClose={handleClose}
            />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error("useSnackbar must be used within a SnackbarProvider");
    return context;
};
