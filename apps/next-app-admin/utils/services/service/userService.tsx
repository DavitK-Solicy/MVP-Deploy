import { Context } from 'react';
import { AuthResponse } from 'types/authResponse';
import { UserRoles } from 'utils/constants/userRoles';
import { User, UserBankAccount } from '../../model/user';
import { Contextualizer } from '../contextualizer';
import { ProvidedServices } from '../providedServices';
import { axiosInstance } from 'utils/services/service/axiosService';
import { UserResponse } from 'types/user';

export interface IUserService {
  getAllUsers(
    limit?: number,
    offset?: number
  ): Promise<{
    data: Array<User>;
    count: number;
  }>;
  getCurrentUser(): Promise<UserResponse>;
  updateUser(user: User): Promise<UserResponse>;
  deleteUser(id: string): Promise<AuthResponse>;
  createUser(
    email: string,
    password: string,
    role: UserRoles,
    bankAccount: UserBankAccount,
    username?: string
  ): Promise<{
    success: boolean;
    message?: string;
    data?: UserResponse;
  }>;
}

export const UserServiceContext: Context<
  IUserService | undefined
> = Contextualizer.createContext(ProvidedServices.UserService);

export const useUserServices = () =>
  Contextualizer.use<IUserService>(ProvidedServices.UserService);

export const UserService = ({ children }: any) => {
  const userService = {
    async getAllUsers(
      limit: number = 0,
      offset: number = 0
    ): Promise<{
      data: Array<User>;
      count: number;
    }> {
      try {
        const response = await axiosInstance.get(
          `/users/admin?limit=${limit}&offset=${offset}`
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getCurrentUser(): Promise<UserResponse> {
      const response = await axiosInstance.get(`/users/me`);

      return response.data;
    },

    async updateUser(user: User): Promise<UserResponse> {
      try {
        const response = await axiosInstance.put(
          `/users/admin/update-user/${user._id}`,
          {
            username: user.username,
            role: user.role,
            email: user.email,
            bankAccount: user.bankAccount,
          }
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUser(id: string): Promise<AuthResponse> {
      try {
        const response = await axiosInstance.delete(`/users/admin/${id}`);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async createUser(
      email: string,
      password: string,
      role: UserRoles,
      bankAccount: UserBankAccount,
      username: string = 'Yamparala Rahul'
    ): Promise<{
      success: boolean;
      message?: string;
      data?: UserResponse;
    }> {
      try {
        const response = await axiosInstance.post('/users/admin', {
          username,
          email,
          password,
          role,
          bankAccount,
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
