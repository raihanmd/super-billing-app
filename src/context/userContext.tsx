"use client";

import { createContext, useContext } from "react";

//@ts-ignore
export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children, user }: { children: React.ReactNode; user: any }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
