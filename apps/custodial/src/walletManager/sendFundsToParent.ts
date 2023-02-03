import { getContractRPC } from "./getContractRPC";
import { contracts } from "../util/constants/contracts";

const sendFundsToParent = async (parentAddress, childAddress, childPK) => {
  try {
    const [usdtContract, web3] = getContractRPC(contracts['MTK']);

    if (!usdtContract)
      return false;

    web3.eth.accounts.wallet.add(childPK);

    const childBalance = await usdtContract.methods.balanceOf(childAddress).call();

    if (childBalance == '0') {
      console.log("Balance is zero. Returning.");
      return true;
    }

    const trx = usdtContract.methods.transfer(parentAddress, childBalance);
    const gas = await trx.estimateGas({ from: childAddress });
    const rawTx = {
      from: childAddress,
      to: contracts['MTK'].address,
      data: trx.encodeABI(),
      gas: gas,
      value: "0x0",
    }

    console.log("Balance", childBalance);
    console.log("Sending tx");

    // eslint-disable-next-line no-async-promise-executor
    const receipt = await web3.eth.sendTransaction(rawTx);
    console.log('Tx hash: ', receipt.transactionHash);

    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export default sendFundsToParent;
