import { ReactNode } from 'react';
import { User } from 'utils/model/user';
import { GeneralResponse } from '.';

export interface ContextProps {
  [key: string]: string | ReactNode;
}

export interface UserResponse extends GeneralResponse {
  data?: User;
}

export interface UserAllDataResponse extends GeneralResponse {
  data?: Array<User>;
}
