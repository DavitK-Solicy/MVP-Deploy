import { Context } from 'react';
import { Contextualizer } from 'utils/services/contextualizer';
import { ProvidedServices } from 'utils/services/providedServices';
import { axiosInstance } from 'utils/services/service/axiosService';
import { ContextProps } from 'types/user';
import { OrderType } from 'types/orders';

export interface IOrdersService {
  getAllOrders(): Promise<{
    success: boolean;
    data: Array<OrderType>;
    count: number;
  }>;
}

export const OrdersServiceContext: Context<IOrdersService> = Contextualizer.createContext(
  ProvidedServices.OrderService
);

export const useOrdersServices = (): IOrdersService =>
  Contextualizer.use<IOrdersService>(ProvidedServices.OrderService);

export const OrderService = ({ children }: ContextProps) => {
  const orderService = {
    async getAllOrders(): Promise<{
      success: boolean;
      data: Array<OrderType>;
      count: number;
    }> {
      try {
        const response = await axiosInstance.get('/orders/');

        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  };

  return (
    <OrdersServiceContext.Provider value={orderService}>
      {children}
    </OrdersServiceContext.Provider>
  );
};
