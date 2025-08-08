import React, { useState, type ReactNode } from "react";
import { UserAuthContext, type User } from "./Usercontext";
interface UserProviderProps {
  children: ReactNode;
}

const UsercontentProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserAuthContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UsercontentProvider;
