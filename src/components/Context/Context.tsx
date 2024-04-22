import React, { useState, useContext, createContext, ReactNode } from 'react';

type AppProviderProps = {
  children: ReactNode;
}

type ContextTypes = {
    name: string
}

const AppContext = createContext<ContextTypes | undefined>(undefined);

const AppProvider = ({ children }: AppProviderProps) => {
  const [name] = useState('Jay');

  return (
    <AppContext.Provider value={{name}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {

  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider };