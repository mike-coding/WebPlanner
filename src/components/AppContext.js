import React, { createContext, useContext } from 'react';
import { useTasks } from './UseTasks';
import { useCategories} from './UseCategories';
import { useRules } from './UseRules'

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