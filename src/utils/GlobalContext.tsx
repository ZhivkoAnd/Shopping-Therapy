import React, { useState, createContext, useContext } from "react";

const GlobalContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({ children }: Props) => {
  const [logoutNotification, setLogoutNotification] = useState(false);
  const [loginNotification, setLoginNotification] = useState(false);
  const [registerNotification, setRegisterNotification] = useState(false);

  return (
    // Then we pass the current user that we get from firebase to the components
    <GlobalContext.Provider
      value={{
        logoutNotification,
        setLogoutNotification,
        loginNotification,
        setLoginNotification,
        registerNotification,
        setRegisterNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalState = () => {
  return useContext(GlobalContext);
};
