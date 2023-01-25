import { Context } from 'react';
import { Coins, ConvertTo } from 'components/shared/balanceCard/type';
import { PaymentResponse } from 'types/wallet';
import { Contextualizer } from 'utils/services/contextualizer';
import { ProvidedServices } from 'utils/services/providedServices';
import { axiosInstance } from 'utils/services/service/axiosService';

export interface IPaymentService {
  getCurrencyBalance(
    coins: Array<Coins>,
    amount: number,
    currencyType?: string
  ): Promise<PaymentResponse>;
}

export const PaymentServiceContext: Context<
  IPaymentService | undefined
> = Contextualizer.createContext(ProvidedServices.PaymentService);

export const usePaymentServices = () =>
  Contextualizer.use<IPaymentService>(ProvidedServices.PaymentService);

export const PaymentService = ({ children }: any) => {
  const paymentService = {
    async getCurrencyBalance(
      coins: Array<Coins> = [],
      amount: number,
      currencyType?: ConvertTo
    ): Promise<PaymentResponse> {
      try {
        const response = await axiosInstance.get(
          `/payments/convert?coins=${coins}&amount=${amount}&currencyType=${currencyType}`
        );

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  };

  return (
    <PaymentServiceContext.Provider value={paymentService}>
      {children}
    </PaymentServiceContext.Provider>
  );
};
