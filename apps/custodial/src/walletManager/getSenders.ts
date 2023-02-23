import { EventData } from 'web3-eth-contract';
import { getContractRPC } from './getContractRPC';
import { contracts } from '../util/constants/contracts';

interface Senders {
  [key: string]: number;
}

export const getSenders = async (
  address: string
): Promise<{
  senders: Senders;
  transactions: Array<EventData>;
}> => {
  const [usdtContract] = getContractRPC(contracts['MTK']);

  const transactions = await usdtContract.getPastEvents('Transfer', {
    filter: { to: address },
    fromBlock: 0,
    toBlock: 'latest',
  });

  if (!transactions) return;

  const senders = {};
  transactions.map((t) => {
    if (!senders[t.returnValues.from]) {
      senders[t.returnValues.from] = Number(t.returnValues.value);
    } else {
      senders[t.returnValues.from] += Number(t.returnValues.value);
    }
  });

  return { senders, transactions };
};
