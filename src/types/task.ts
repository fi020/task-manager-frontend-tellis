export type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    user: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
};

export type TaskInput = {
    title: string;
    description: string;
    completed: boolean;
};

export type Tasks = Task[];
