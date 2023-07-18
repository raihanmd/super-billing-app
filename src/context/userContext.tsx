"use client";
import React, { createContext, useContext } from "react";

export const UserContext = createContext<any>(null);

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children, user }: { children: React.ReactNode; user: any }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
