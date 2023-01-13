import { createContext } from 'react';

interface AuthContext {
  path: string;
  authorized: boolean;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);
