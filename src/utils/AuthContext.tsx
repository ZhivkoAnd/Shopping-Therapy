import React, { useState, useEffect, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./Firebase";

const AuthContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState({});

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // Then we pass the current user that we get from firebase to the components
    <AuthContext.Provider value={{ user, createUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
