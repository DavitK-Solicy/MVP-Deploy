import { Context } from 'react';
import { Contextualizer } from 'utils/services/contextualizer';
import { ProvidedServices } from 'utils/services/providedServices';
import { axiosInstance } from 'utils/custodial';
import { ContextProps } from 'types/user';
import { WalletResponse } from 'types/wallet';

export interface IWalletService {
  createWallet(email: string, password: string): Promise<WalletResponse>;
  deleteWallet(id: string): Promise<WalletResponse>;
}

export const WalletServiceContext: Context<
  IWalletService | undefined
> = Contextualizer.createContext(ProvidedServices.WalletService);

export const useWalletServices = (): IWalletService =>
  Contextualizer.use<IWalletService>(ProvidedServices.WalletService);

export const WalletService = ({ children }: ContextProps): JSX.Element => {
  const walletService = {
    async createWallet(): Promise<WalletResponse> {
      try {
        const response = await axiosInstance.post('/wallets/');

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteWallet(id: string): Promise<WalletResponse> {
      try {
        const response = await axiosInstance.post(`/wallets/${id}`);

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  };

  return (
    <WalletServiceContext.Provider value={walletService}>
      {children}
    </WalletServiceContext.Provider>
  );
};