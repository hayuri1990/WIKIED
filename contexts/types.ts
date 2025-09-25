import { ReactNode } from 'react';
import { AuthResponseType, UserInfo } from '@/types/auth';

export interface AuthContextType {
  isLoggedIn: boolean;
  logInData: AuthResponseType | null;
  user: UserInfo | null;
  login: (authResponse: AuthResponseType) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
