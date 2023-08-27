import { utils } from 'ethers';

import { getAccountCreditData, AccountCreditData } from '@/lib/credit';
import {
  getBalance,
  AccountCurrentBalance,
  AccountCurrentTokenBalance,
  getTokenBalance,
  Chain,
} from '@/lib/token';

import creditRequestContract from './contract';

async function getAccounts(): Promise<string[]> {
  const requesters = await creditRequestContract.getAddressesWithRequests();
  return requesters;
}

export type AccountData = {
  address: string;
  creditData: AccountCreditData;
  currentBalance: AccountCurrentBalance;
  requestedCredit: string;
};

export async function getAccountData(): Promise<AccountData[]> {
  // fetch data for all accounts that are requesting additional credit

  const accounts = await getAccounts();

  const accountDataPromises = accounts.map(async (address) => {
    const creditData = await getAccountCreditData(address);
    const currentBalance = await getBalance(address);
    const requestedCredit = await creditRequestContract.getRequestedCredit(address);

    return {
      address: address,
      creditData: creditData,
      currentBalance: currentBalance,
      requestedCredit: utils.formatUnits(requestedCredit, 18),
    };
  });

  const accountData = await Promise.all(accountDataPromises);

  return accountData;
}

export interface Addresses {
  address: string;
  type: string;
  chain: Chain;
}

export type FilteredAccountData = AccountData & {
  tokenBalances?: AccountCurrentTokenBalance[];
};

export async function getAccountFilteredData(addressFilters: Addresses[]) {
  const accounts = await getAccounts();

  const tokenFilters = addressFilters
    .filter((flt) => flt.type === 'token' && flt.address !== '')
    .map((flt) => {
      return {
        address: flt.address,
        chain: flt.chain,
      };
    });

  const nftFilters = addressFilters
    .filter((flt) => flt.type === 'nft' && flt.address !== '')
    .map((flt) => {
      return {
        address: flt.address,
        chain: flt.chain,
      };
    });

  const accountDataPromises = accounts.map(async (address) => {
    const creditData = await getAccountCreditData(address);
    const currentBalance = await getBalance(address);

    const result: FilteredAccountData = {
      address,
      creditData,
      currentBalance,
    };

    if (tokenFilters.length > 0) {
      const tokenBalances = await getTokenBalance(address, tokenFilters);
      result.tokenBalances = tokenBalances;
    }

    return result;
  });

  let accountData = await Promise.all(accountDataPromises);

  if (accountData.some((item) => item.tokenBalances !== undefined)) {
    const greaterThanZero = (accBalance: AccountCurrentTokenBalance) => accBalance.balance > 0;
    accountData = accountData.filter((account) => account.tokenBalances!.every(greaterThanZero));
  }

  return accountData;
}
