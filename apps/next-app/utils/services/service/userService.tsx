import { Context } from 'react';
import { Contextualizer } from '../contextualizer';
import { ProvidedServices } from '../providedServices';
import { axiosInstance } from 'utils/services/service/axiosService';
import { ContextProps } from 'types/user';
import { User } from 'utils/model/user';

export interface IUserService {
  getCurrentUser(): Promise<{
    error?: string;
    success: boolean;
    data?: User;
  }>;
  updateEmbed(
    embed: string
  ): Promise<{
    success: boolean;
    data: string;
    message: string;
  }>;
}

export const UserServiceContext: Context<IUserService> = Contextualizer.createContext(
  ProvidedServices.UserService
);

export const useUserServices = (): IUserService =>
  Contextualizer.use<IUserService>(ProvidedServices.UserService);

export const UserService = ({ children }: ContextProps) => {
  const userService = {
    async getCurrentUser(): Promise<{
      error?: string;
      success: boolean;
      data?: User;
    }> {
      try {
        const response = await axiosInstance.get(`/users/me`);

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async updateEmbed(
      embed: string
    ): Promise<{
      success: boolean;
      data: string;
      message: string;
    }> {
      try {
        const response = await axiosInstance.put('/users/update-embed', {
          embed,
        });

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  };

  return (
    <UserServiceContext.Provider value={userService}>
      {children}
    </UserServiceContext.Provider>
  );
};
