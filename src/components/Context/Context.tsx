import React, { useState, useContext, createContext, ReactNode } from 'react';

type AppProviderProps = {
  children: ReactNode;
}

type ContextTypes = {
    name: string
}

// Creates a new context called AppContext using createContext.
// It's initialized with undefined as the default value
const AppContext = createContext<ContextTypes | undefined>(undefined);

// The AppProvider is the function that we will wrap our App with. It will provide all the components in our App with the props that we specify.
const AppProvider = ({ children }: AppProviderProps) => {
  const [name] = useState('Jay');

  return (
    <AppContext.Provider value={{name}}>
      {children}
    </AppContext.Provider>
  );
};

// We make a custom hook that will throw an error if context doesn't exist
export const useGlobalContext = () => {

  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider };