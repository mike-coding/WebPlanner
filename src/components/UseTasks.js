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
      AUTO_TASK: { label: 'AUTO:TASK', color: '#4bbcb8' },
      AUTO_EVENT: { label: 'AUTO:EVENT', color: '#ed4b74' },
    };
  
    const formatDate = (date) => {
        if (!date) return 'No Date';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
    const addTask = (taskData) => {
      const nextID =
        Object.keys(tasks).reduce(
          (maxId, taskId) => Math.max(maxId, parseInt(taskId)),
          0
        ) + 1;
  
      const newTask = {
        id: nextID,
        parentId: taskData.parentId || null,
        label: taskData.label || 'New Task',
        isCompleted: false,
        description: taskData.description || '',
        category: taskData.category || null,
        parentCategoryId: taskData.parentCategoryId || null,
        parentRuleId: taskData.parentRuleId || null,
        type: taskData.type || taskTypes.TASK,
        dueDate: taskData.dueDate ? formatDate(taskData.dueDate) : null,
      };
  
      setTasks((prevTasks) => ({ ...prevTasks, [nextID]: newTask }));
    };
  
    const toggleTaskCompletion = (task) => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [task.id]: {
          ...prevTasks[task.id],
          isCompleted: !prevTasks[task.id].isCompleted,
        },
      }));
    };
  
    const changeTaskAttribute = (task, attribute, newValue) => {
      if (attribute === 'dueDate' && newValue instanceof Date) {
        newValue = formatDate(newValue);
      }
      setTasks((prevTasks) => ({
        ...prevTasks,
        [task.id]: {
          ...prevTasks[task.id],
          [attribute]: newValue,
        },
      }));
    };
  
    const deleteTask = (task) => {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        delete updatedTasks[task.id]; // Remove the task from the object
        return updatedTasks;
      });
    };
  
    const clearTasks = () => {
      setTasks({});
      localStorage.removeItem('tasks'); // Clear tasks from localStorage
    };
  
    // Helper functions
  
    const getTaskByParentRuleCategoryAndDueDate = (
      parentRuleId,
      parentCategoryId,
      dueDate
    ) => {
      const dueDateString = formatDate(dueDate);
      return Object.values(tasks).find(
        (task) =>
          task.parentRuleId === parentRuleId &&
          task.parentCategoryId === parentCategoryId &&
          task.dueDate === dueDateString
      );
    };
  
    const getTasksDueOnDate = (date) => {
      const dateString = formatDate(date);
      return Object.values(tasks).filter((task) => task.dueDate === dateString);
    };
  
    const deleteTasksByParentRuleAndCategoryId = (
      parentRuleId,
      parentCategoryId
    ) => {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        Object.keys(updatedTasks).forEach((taskId) => {
          const task = updatedTasks[taskId];
          if (
            task.parentRuleId === parentRuleId &&
            task.parentCategoryId === parentCategoryId
          ) {
            delete updatedTasks[taskId];
          }
        });
        return updatedTasks;
      });
    };
  
    return {
      tasks,
      addTask,
      toggleTaskCompletion,
      changeTaskAttribute,
      deleteTask,
      clearTasks,
      taskTypes,
      getTaskByParentRuleCategoryAndDueDate,
      getTasksDueOnDate,
      deleteTasksByParentRuleAndCategoryId,
    };
  }
