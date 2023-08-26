import { fetchAccountTrusted, config } from '@unioncredit/data';
import { utils } from 'ethers';

const CHAIN_ID_ETHEREUM = 1;
const CHAIN_ID_ARBITRUM = 42161;

// copied from https://github.com/unioncredit/union-data/blob/master/src/trustline.ts
interface Trustline {
  id: string;
  staker: string;
  borrower: string;
  amount: string;
  timestamp: string;
}

// copied from https://github.com/unioncredit/union-data/blob/master/src/borrows.ts
interface Borrow {
  id: string;
  account: string;
  amount: string;
  fee: string;
  timestamp: string;
}

// copied from https://github.com/unioncredit/union-data/blob/master/src/repay.ts
interface Repay {
  id: string;
  account: string;
  amount: string;
  fee: string;
  timestamp: string;
}

type AmountData = Trustline | Borrow | Repay;

function getTotalAmount(amountData: AmountData[]) {
  // accumulate the credit available in an array of Credit-related data;
  // it works for Trustline, Borrow, and Repay data since they all have
  // an amount

  const total = amountData
    .map((element) => parseFloat(utils.formatUnits(element.amount, 18)))
    .reduce((accumulator, elementAmount) => accumulator + elementAmount, 0);

  return total;
}

type UserAddress = string;

type CreditData = {
  trustedBy: number;
  trustedCredit: number;
  borrowedAmount: number;
  repaidAmount: number;
};

export type AccountCreditData = {
  ethereum: CreditData;
  arbitrum: CreditData;
};

export async function getAccountCreditData(userAddress: UserAddress): Promise<AccountCreditData> {
  // get data related to the credit status on the Union Protocol
  // for a specific user address

  config.set('chainId', CHAIN_ID_ETHEREUM);
  const trustedEthereum = await fetchAccountTrusted(userAddress);
  const borrowedEthereum = await fetchAccountTrusted(userAddress);
  const repaidEthereum = await fetchAccountTrusted(userAddress);

  config.set('chainId', CHAIN_ID_ARBITRUM);
  const trustedArbitrum = await fetchAccountTrusted(userAddress);
  const borrowedArbitrum = await fetchAccountTrusted(userAddress);
  const repaidArbitrum = await fetchAccountTrusted(userAddress);

  const accountCreditData = {
    ethereum: {
      trustedBy: trustedEthereum.length,
      trustedCredit: getTotalAmount(trustedEthereum),
      borrowedAmount: getTotalAmount(borrowedEthereum),
      repaidAmount: getTotalAmount(repaidEthereum),
    },
    arbitrum: {
      trustedBy: trustedArbitrum.length,
      trustedCredit: getTotalAmount(trustedArbitrum),
      borrowedAmount: getTotalAmount(borrowedArbitrum),
      repaidAmount: getTotalAmount(repaidArbitrum),
    },
  };

  return accountCreditData;
}
