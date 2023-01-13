import Web3 from "web3"
import { ContractInfo } from "../util/constants/contracts";
import { chains } from "../util/constants/chains";
import { Contract } from "web3-eth-contract";

export const getContract = (contractInfo: ContractInfo) : Contract | false => {
  try {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(chains[contractInfo.chainId].wsUrl));
    return new web3.eth.Contract(contractInfo.abi, contractInfo.address);
  } catch (e) {
    console.error(e);
    return false;
  }
}
