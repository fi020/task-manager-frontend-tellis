import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface TaskInput {
    title: string;
    description: string;
    completed: boolean;
}

interface TaskContextProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    addTask: (task: TaskInput) => Promise<void>;
    fetchTasks: () => Promise<void>;
    toggleTaskCompletion: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = async (task: TaskInput) => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                throw new Error("No authentication token found. Please login first.");
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/tasks`,
                task,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newTask: Task = response.data;
            setTasks((prev) => [...prev, newTask]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                throw new Error("No authentication token found. Please login first.");
            }

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const taskList: Task[] = response.data;
            setTasks(taskList);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            fetchTasks();
        }
    }, []);
    // In TaskContext.tsx
    const toggleTaskCompletion = async (taskId: string) => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                throw new Error("No authentication token found. Please login first.");
            }
    
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/tasks/${taskId}/toggle`,
                {}, // Empty body for PATCH
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // curently i am just Update local state optimistically (or refetch)
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? { ...task, completed: !task.completed } : task
                )
            );
        } catch (error) {
            console.error(`Failed to toggle task ${taskId}:`, error);
        }
    };
    



    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, fetchTasks, toggleTaskCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
