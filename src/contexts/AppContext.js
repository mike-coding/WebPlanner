import React, { createContext, useContext } from 'react';
import { useTasks } from '../hooks/UseTasks';
import { useCategories} from '../hooks/UseCategories';
import { useRules } from '../hooks/UseRules'

const AppContext = createContext();

export function AppProvider({ children }) {
  const taskData = useTasks();
  const categoryData = useCategories();
  const ruleData = useRules();

  const contextValue = {
    ...taskData,
    ...categoryData,
    ...ruleData
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}