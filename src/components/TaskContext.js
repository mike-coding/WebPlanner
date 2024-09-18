import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const TaskContext = createContext();

// Provider component that wraps your app and provides the task data
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (label) => {
        if (label.trim().length > 0) {
            const nextID = Object.keys(tasks).reduce((maxId, taskId) => Math.max(maxId, parseInt(taskId)), 0) + 1;
            const newTask = { id: nextID, label: label, isCompleted: false };
            setTasks(prevTasks => ({...prevTasks, [nextID]: newTask}));
        }
    };

    const toggleTaskCompletion = (task) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [task.id]: {
                ...prevTasks[task.id],
                isCompleted: !prevTasks[task.id].isCompleted
            }
        }));
    };

    const renameTask = (task, newName) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [task.id]: {
                ...prevTasks[task.id],
                label: newName
            }
        }));
    };

    const deleteTask = (task) => {
        const taskId = task.id
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            delete updatedTasks[taskId]; // Remove the task from the object
            return updatedTasks;
        });
    };

    const clearTasks = () => {
        setTasks({});
        localStorage.removeItem('tasks');  // Clear tasks from localStorage
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, renameTask, deleteTask, clearTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

// Custom hook to use the context
export function useTasks() {
    return useContext(TaskContext);
}