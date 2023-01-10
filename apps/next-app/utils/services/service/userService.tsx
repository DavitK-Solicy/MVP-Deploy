import { Context } from 'react';
import { Contextualizer } from '../contextualizer';
import { ProvidedServices } from '../providedServices';
import { axiosInstance } from 'utils/services/service/axiosService';
import { Investment } from 'types/investment';
import { Invitation } from 'types/invitation';
import { ContextProps } from 'types/user';

export interface IUserService {
  inviteFriends(
    email: string
  ): Promise<{
    success: boolean;
    message?: string;
    error?: string;
    data?: Invitation;
  }>;
  getUserReferrals(
    limit: number,
    offset: number
  ): Promise<{
    success: boolean;
    error?: string;
    data?: Invitation[];
    count?: number;
    countForUser?: number;
  }>;
  getUserInvestments(
    limit?: number,
    offset?: number
  ): Promise<{
    success: boolean;
    error?: string;
    data?: Investment[];
    count?: number;
    totalInvestment?: number;
  }>;
  downloadUserSaft(
    fileId: string
  ): Promise<{
    success: boolean;
    error?: string;
    data?: string;
    message?: string;
  }>;
}

export const UserServiceContext: Context<IUserService> = Contextualizer.createContext(
  ProvidedServices.UserService
);

export const useUserServices = (): IUserService =>
  Contextualizer.use<IUserService>(ProvidedServices.UserService);

export const UserService = ({ children }: ContextProps) => {
  const userService = {
    async inviteFriends(
      email: string
    ): Promise<{
      success: boolean;
      message?: string;
      error?: string;
      data?: Invitation;
    }> {
      try {
        const response = await axiosInstance.post('/users/invite-friends', {
          toEmail: email,
        });

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getUserReferrals(
      limit: number,
      offset: number
    ): Promise<{
      success: boolean;
      error?: string;
      data?: Invitation[];
      count?: number;
      countForUser?: number;
    }> {
      const response = await axiosInstance.get(
        `/users/referrals?limit=${limit}&offset=${offset}`
      );

      return response.data;
    },

    async getUserInvestments(
      limit: number = 0,
      offset: number = 0
    ): Promise<{
      success: boolean;
      error?: string;
      data?: Investment[];
      count?: number;
      totalInvestment?: number;
    }> {
      try {
        const response = await axiosInstance.get(
          `/users/investments?limit=${limit}&offset=${offset}`
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async downloadUserSaft(fileId: string): Promise<{
      success: boolean;
      error?: string;
      data?: string;
      message?: string;
    }> {
      try {
        const response = await axiosInstance.post('/users/saft', { fileId });
        return response.data;
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <UserServiceContext.Provider value={userService}>
      {children}
    </UserServiceContext.Provider>
  );
};
