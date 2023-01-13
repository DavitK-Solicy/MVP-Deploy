import { ReactNode } from 'react';
import { User } from 'utils/model/user';

export interface ContextProps {
  [key: string]: string | ReactNode;
}

export interface GeneralResponse {
  count?: number;
  error?: string;
  success: boolean;
}

export interface UserResponse extends GeneralResponse {
  data?: User;
}

export interface UserAllDataResponse extends GeneralResponse {
  data?: Array<User>;
}
