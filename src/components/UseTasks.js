import React, { useState, useEffect } from 'react';

// Provider component that wraps your app and provides the task data
export function useTasks() {
    const [tasks, setTasks] = useState(() => {
      const storedTasks = localStorage.getItem('tasks');
      return storedTasks ? JSON.parse(storedTasks) : {};
    });
  
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
    const taskTypes = {
      EVENT: { label: 'EVENT', color: '#ED744B' },
      TASK: { label: 'TASK', color: '#4BBC78' },
      //RULE: { label: 'RULE', color: '#639BEE' },
      SUBTASK_EVENT: { label: 'SUBTASK : EVENT', color: '#FF9BB6' },
      SUBTASK_RULE: { label: 'SUBTASK : RULE', color: '#BF8CDB' },
    };

    function formatDate(date) {
        if (!date) return 'No Date';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
      }

    const addTask = (label) => {
        if (label.trim().length > 0) {
            const nextID = Object.keys(tasks).reduce((maxId, taskId) => Math.max(maxId, parseInt(taskId)), 0) + 1;
            const newTask = { 
                id: nextID, 
                parentId: null,
                label: label, 
                isCompleted: false, 
                description: "", 
                category: null, 
                type: taskTypes.TASK, 
                dueDate:formatDate(new Date())};
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

    const changeTaskAttribute = (task, attribute, newValue) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            [task.id]: {
                ...prevTasks[task.id],
                [attribute]: newValue
            }
        }));
    };

    const deleteTask = (task) => {
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            delete updatedTasks[task.id]; // Remove the task from the object
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
        changeTaskAttribute,
        deleteTask,
        clearTasks,
        taskTypes
    };
}
