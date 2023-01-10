import { Context } from 'react';
import { ContextProps } from 'types/user';
import { AuthResponse } from 'types/auth';
import * as localStorage from 'utils/services/localStorageService';
import { Contextualizer } from 'utils/services/contextualizer';
import { ProvidedServices } from 'utils/services/providedServices';
import localStorageKeys from 'utils/constants/localStorageKeys';
import { axiosInstance } from 'utils/services/service/axiosService';
import env from 'utils/constants/env';

export interface IAuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  signup(email: string, password: string): Promise<AuthResponse>;
  changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<AuthResponse>;
  logout(): Promise<{
    success: boolean;
    message?: string;
    error?: string;
  }>;
  signupByGoogle(googleToken: string): Promise<AuthResponse>;
  loginByGoogle(googleToken: string): Promise<AuthResponse>;
  sendRecoverPasswordEmail(
    email: string
  ): Promise<{
    success: boolean;
    message?: string;
    error?: string;
  }>;
  updateForgottenPassword(
    password: string,
    emailVerificationToken: string
  ): Promise<{
    success: boolean;
    message?: string;
    error?: string;
  }>;
};

export const AuthServiceContext: Context<
  IAuthService | undefined
> = Contextualizer.createContext(ProvidedServices.AuthService);

export const useAuthServices = (): IAuthService =>
  Contextualizer.use<IAuthService>(ProvidedServices.AuthService);

export const AuthService = ({ children }: ContextProps): JSX.Element => {
  const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
      try {
        const response = await axiosInstance.post('/users/login', {
          email,
          password,
        });

        if (response.data.token) {
          localStorage.setItemInLocalStorage(
            localStorageKeys.TOKEN_KEY,
            response.data.token
          );
        }

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async signupByGoogle(googleToken: string): Promise<AuthResponse> {
      try {
        const response = await axiosInstance.post('/users/signup/google', {
          googleToken,
        });

        if (response.data.token) {
          localStorage.setItemInLocalStorage(
            localStorageKeys.TOKEN_KEY,
            response.data.token
          );
        }

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async loginByGoogle(googleToken: string): Promise<AuthResponse> {
      try {
        const response = await axiosInstance.post('/users/login/google', {
          googleToken,
        });

        if (response.data.token) {
          localStorage.setItemInLocalStorage(
            localStorageKeys.TOKEN_KEY,
            response.data.token
          );
        }

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async signup(email: string, password: string): Promise<AuthResponse> {
      try {
        const response = await axiosInstance.post('/users/signup', {
          email,
          password,
        });
        if (response.data.token) {
          localStorage.setItemInLocalStorage(
            localStorageKeys.TOKEN_KEY,
            response.data.token
          );
        }

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async changePassword(
      oldPassword: string,
      newPassword: string
    ): Promise<AuthResponse> {
      try {
        const response = await axiosInstance.put('/users/change-password', {
          oldPassword,
          newPassword,
        });

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async logout(): Promise<{
      success: boolean;
      message?: string;
      error?: string;
    }> {
      try {
        const response = await axiosInstance.post('/users/logout');

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async loginByTwitter(socketId: string): Promise<Window> {
      const width = 600, height = 600;
      const left = (window.innerWidth / 2) - (width / 2);
      const top = (window.innerHeight / 2) - (height / 2);

      const url = `${env.nextPublicApiBaseUrl}/users/login/twitter?socketId=${socketId}`;
      return window.open(url, '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`
      )
    },

    async sendRecoverPasswordEmail(
      email: string
    ): Promise<{
      success: boolean;
      message?: string;
      error?: string;
    }> {
      try {
        const response = await axiosInstance.post('/users/recover-password', {
          email,
        });

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async updateForgottenPassword(
      password: string,
      emailVerificationToken: string
    ): Promise<{
      success: boolean;
      message?: string;
      error?: string;
    }> {
      try {
        const response = await axiosInstance.put(
          `/users/update-forgotten-password`,
          {
            newPassword: password,
            emailVerificationToken: emailVerificationToken,
          }
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  };

  return (
    <AuthServiceContext.Provider value={authService}>
      {children}
    </AuthServiceContext.Provider>
  );
};
