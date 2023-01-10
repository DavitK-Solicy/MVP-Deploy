import { AuthService } from './authService';

export const GlobalServices = ({ children }): JSX.Element => {
  return <AuthService>{children}</AuthService>;
};
