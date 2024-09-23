import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const TaskContext = createContext();

// Provider component that wraps your app and provides the task data
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
      const storedTasks = localStorage.getItem('tasks');
      return storedTasks ? JSON.parse(storedTasks) : {};
    });
  
    const [categories, setCategories] = useState(() => {
      const storedCategories = localStorage.getItem('categories');
      return storedCategories
        ? JSON.parse(storedCategories)
        : [
            { name: 'Work', type: 'TASK' },
            { name: 'Personal', type: 'TASK' },
            { name: 'Shopping', type: 'TASK' },
            { name: 'Errands', type: 'TASK' },
          ];
    });
  
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
    useEffect(() => {
      localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);
  
    const taskTypes = {
      EVENT: { label: 'EVENT', color: '#ED744B' },
      TASK: { label: 'TASK', color: '#4BBC78' },
      //RULE: { label: 'RULE', color: '#639BEE' },
      SUBTASK_EVENT: { label: 'SUBTASK : EVENT', color: '#FF9BB6' },
      SUBTASK_RULE: { label: 'SUBTASK : RULE', color: '#BF8CDB' },
    };

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
                dueDate: null };
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

    const addCategory = (categoryName, categoryType) => {
        if (
          categoryName.trim().length > 0 &&
          !categories.some((cat) => cat.name === categoryName.trim())
        ) {
          setCategories((prevCategories) => [
            ...prevCategories,
            { name: categoryName.trim(), type: categoryType },
          ]);
        }
      };
    
    // Function to delete a category
    const deleteCategory = (categoryName) => {
    setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.name !== categoryName)
    );

    // Update tasks that have this category
    setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        Object.values(updatedTasks).forEach((task) => {
        if (task.category === categoryName) {
            task.category = null; // Or set to null
        }
        });
        return updatedTasks;
    });
    };

    return (
    <TaskContext.Provider
        value={{
        tasks,
        categories,
        addTask,
        toggleTaskCompletion,
        changeTaskAttribute,
        deleteTask,
        clearTasks,
        taskTypes,
        addCategory,
        deleteCategory
        }}
    >
        {children}
    </TaskContext.Provider>
    );
}
    
// Custom hook
export function useTasks() {
    return useContext(TaskContext);
}