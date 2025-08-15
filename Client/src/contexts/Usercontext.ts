import { createContext } from "react";

// Define the User interface
export interface User {
  id: string;
  username: string;
  email: string;
  clipboards: number;
  feedbacks: string[];
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

// Create the context with default dummy values
export const UserAuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
});
