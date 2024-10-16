import { useState, useEffect } from 'react';

export default function useTasks(){
    const [tasks, setTasks] = useState(() => {
        // Attempt to load tasks from local storage or initialize with given tasks
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : {};
    });

    useEffect(() => {
        // Save tasks to local storage on changes
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

    const deleteTask = (taskId) => {
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

    return {
        tasks,
        addTask,
        toggleTaskCompletion,
        renameTask,
        deleteTask,
        clearTasks
    };
};
