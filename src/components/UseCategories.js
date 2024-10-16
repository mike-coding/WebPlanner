import React, { useState, useEffect } from 'react';

export function useCategories() {
    const [categories, setCategories] = useState(() => {
      const storedCategories = localStorage.getItem('categories');
      return storedCategories
        ? JSON.parse(storedCategories)
        : [
            { symbol: "👨‍💼", name: 'Work', type: 'TASK', rules: [] },
            { symbol: "🐒", name: 'Personal', type: 'TASK', rules: [] },
            { symbol: "🛍️", name: 'Shopping', type: 'TASK', rules: [] },
            { symbol: "🏃‍♂️", name: 'Errands', type: 'TASK', rules: [] },
          ];
    });
  
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

    const months = {JAN:1,FEB:2,MAR:3,APR:4,MAY:5,JUN:6,JUL:7,AUG:8,SEP:9,OCT:10,NOV:11,DEC:12}
    const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    const ruleTemplate = {
      id:0,
      NAME:"testRule",
      START:Date.now(),
      END: Date.now(),
      CHILD_TASKS:[],
      //repeat information
      MONTHS:[1,2,3,4,5,6,7,8,9,10,11,12],
      MONTHLY_WEEKDAYS:[ ( 1, 'WEDNESDAY'), ( 3, 'WEDNESDAY'), ( 1, 'SUNDAY'), ( 3, 'SUNDAY') ],
      MONTHLY_DATES:[1,14,28],
      WEEKLY_DAYS:['SUNDAY', 'WEDNESDAY', 'FRIDAY']
    }

    const addRuleToCategory = (categoryId, rule) => {
      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              rules: [...cat.rules, rule],
            };
          }
          return cat;
        })
      );
    };

    const addCategory = (categorySymbol, categoryName, categoryType) => {
        if (
          categoryName.trim().length > 0 &&
          !categories.some((cat) => cat.name === categoryName.trim())
        ) {
          const nextID = categories.reduce((maxId, cat) => Math.max(maxId, cat.id), 0) + 1;
          const newCategory = {
            id: nextID,
            symbol: categorySymbol,
            name: categoryName.trim(),
            type: categoryType,
            rules: [],
          };
          setCategories((prevCategories) => [...prevCategories, newCategory]);
        }
    };
    
    const deleteCategory = (categoryId) => {
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== categoryId)
      );
    };
    
    const updateCategory = (updatedCategory) => {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
    };

    const updateRuleInCategory = (categoryId, updatedRule) => {
      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              rules: cat.rules.map((rule) =>
                rule.id === updatedRule.id ? updatedRule : rule
              ),
            };
          }
          return cat;
        })
      );
    };

    const deleteRuleFromCategory = (categoryId, ruleId) => {
      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              rules: cat.rules.filter((rule) => rule.id !== ruleId),
            };
          }
          return cat;
        })
      );
    };

    return {
        categories,
        updateCategory,
        addCategory,
        deleteCategory,
        addRuleToCategory,
        updateRuleInCategory,
        deleteRuleFromCategory
    };
}