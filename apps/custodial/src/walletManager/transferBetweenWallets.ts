import Web3 from 'web3';
import { ContractInfo } from '../util/constants/contracts';
import { chains } from '../util/constants/chains';

export const transferBetweenWallets = (
  contractInfo: ContractInfo,
  receiver: string,
  sender: string,
  amount: string
) => {
  try {
    const web3 = new Web3(
      new Web3.providers.WebsocketProvider(chains[contractInfo.chainId].wsUrl)
    );

    web3.eth.sendTransaction({
      to: receiver,
      from: sender,
      value: Web3.utils.toWei(amount, 'ether'),
    });
  } catch (e) {
    console.error(e);
  }
};
