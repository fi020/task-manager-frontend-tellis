import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import UndoSnackbar from "../components/UndoSnackbar";
import { useTaskContext } from "./TaskContext";

type PendingToggle = {
    taskId: string;
    message: string;
    timeoutId: ReturnType<typeof setTimeout>;
    open: boolean;
};

type SnackbarContextType = {
    showUndoSnackbar: (taskId: string, message: string, delay?: number) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { toggleTaskCompletion } = useTaskContext();
    const [pendingToggles, setPendingToggles] = useState<PendingToggle[]>([]);

    const showUndoSnackbar = (taskId: string, message: string, delay = 5000) => {
        console.log("called");
    
        const timeoutId = setTimeout(() => {
            console.log("timeout triggered");
            toggleTaskCompletion(taskId);
        }, delay);
    
        setPendingToggles((prev) => [
            ...prev,
            { taskId, timeoutId, message, open: true }
        ]);
    };
    



    const handleUndo = (taskId: string) => {
        setPendingToggles((prev) =>
            prev.map((pt) => {
                if (pt.taskId === taskId) {
                    clearTimeout(pt.timeoutId);
                    return { ...pt, open: false };
                }
                return pt;
            })
        );

        setTimeout(() => {
            setPendingToggles((prev) => prev.filter((pt) => pt.taskId !== taskId));
        }, 300); // match animation duration
    };

    return (
        <SnackbarContext.Provider value={{ showUndoSnackbar }}>
            {children}
            {pendingToggles.map((pt, index) => (
                <UndoSnackbar
                    key={pt.taskId}
                    open={pt.open}
                    message={pt.message}
                    onUndo={() => handleUndo(pt.taskId)}
                    onClose={() => handleUndo(pt.taskId)}
                    offset={index * 60}
                />
            ))}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error("useSnackbar must be used within a SnackbarProvider");
    return context;
};
