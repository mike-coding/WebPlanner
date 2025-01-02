import React, { useState, useEffect } from 'react';

export function useRules() {
    const [rules, setRules] = useState(() => {
      const storedRules = localStorage.getItem('rules');
      return storedRules
        ? JSON.parse(storedRules)
        : [
            { name: 'SampleRule', start_date: "", end_date:"", repeat_rate:"", require_value:false, require_value_type:"" },
          ];
    });
  
    useEffect(() => {
      localStorage.setItem('rules', JSON.stringify(rules));
    }, [rules]);

    const addRule = (ruleName, startDate, endDate, repeatRate, requireValue, requireValueType) => {
        if (
          ruleName.trim().length > 0 &&
          !rules.some((rule) => rule.name === ruleName.trim())
        ) {
          setRules((prevRules) => [
            ...prevRules,
            { name: ruleName.trim(), start_date: startDate, end_date:endDate, repeat_rate:repeatRate, require_value:requireValue, require_value_type:requireValueType },
          ]);
        }
      };
    
    const deleteRule = (ruleName) => {
    setRules((prevRules) =>
        prevRules.filter((rule) => rule.name !== ruleName)
    );};

    return {
        rules,
        addRule,
        deleteRule
    };
}