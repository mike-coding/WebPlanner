import { useState, useEffect } from 'react';

export default function useTasks(){
    var sampleTask = {
        "id":0,
        "label":"Wash the Dishes",
        "isCompleted":"false"
    }

    const [tasks, setTasks] = useState(() => {
        // Attempt to load tasks from local storage or initialize with given tasks
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        // Save tasks to local storage on changes
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (label) => {
        const nextID = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
        const newTask = { id: nextID, label: label, isCompleted: false };
        setTasks([...tasks, newTask]); // should not wrap newTask in curly braces
    };

    const toggleTaskCompletion = (thisTask) => {
        const id=thisTask.id;
        setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.completed } : task));
    };

    const clearTasks = () => {
        setTasks([]);  // Reset tasks to an empty array
        localStorage.removeItem('tasks');  // Clear tasks from localStorage
    };

    return {
        tasks,
        addTask,
        toggleTaskCompletion,
        clearTasks
    };
};
