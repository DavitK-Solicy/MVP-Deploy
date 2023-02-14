import { Socket } from 'socket.io';
import { checkChildWalletBalance } from '../User/User.api.handlers';

export const initializeSockets = (io): void => {
  io.on('connection', (socket: Socket): void => {
    console.log('A user connected');

    socket.on('childWallet', (data): void => {
      setInterval(() => {
        checkChildWalletBalance(socket, data);
      }, 6000);
    });

    socket.on('disconnect', (): void => {
      console.log('A user disconnected');
    });
  });
};
