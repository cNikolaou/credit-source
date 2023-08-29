import { Contract, utils } from 'ethers';

import { getAccountCreditData, AccountCreditData } from '@/lib/credit';
import {
  getBalance,
  AccountCurrentBalance,
  AccountCurrentTokenBalance,
  getTokenBalance,
  Chain,
} from '@/lib/token';
import { creditRequestContractArb, creditRequestContractAvax } from '@/lib/contract';

async function getAccounts(creditContract: Contract): Promise<string[]> {
  const requesters = await creditContract.getAddressesWithRequests();
  return requesters;
}

export type AccountData = {
  address: string;
  creditData: AccountCreditData;
  currentBalance: AccountCurrentBalance;
  requestedCreditArb: string;
  requestedCreditAvax: string;
};

export async function getAccountData(): Promise<AccountData[]> {
  // fetch data for all accounts that are requesting additional credit

  const accountsArbitrum = await getAccounts(creditRequestContractArb);
  const accountsAvalanche = await getAccounts(creditRequestContractAvax);
  const concat = accountsArbitrum.concat(accountsAvalanche);
  const accounts = Array.from(new Set(concat));

  const accountDataPromises = accounts.map(async (address) => {
    const creditData = await getAccountCreditData(address);
    const currentBalance = await getBalance(address);
    const requestedCreditArb = await creditRequestContractArb.getRequestedCredit(address);
    const requestedCreditAvax = await creditRequestContractAvax.getRequestedCredit(address);

    return {
      address: address,
      creditData: creditData,
      currentBalance: currentBalance,
      requestedCreditArb: utils.formatUnits(requestedCreditArb, 18),
      requestedCreditAvax: utils.formatUnits(requestedCreditAvax, 18),
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
  const accountsArbitrum = await getAccounts(creditRequestContractArb);
  const accountsAvalanche = await getAccounts(creditRequestContractAvax);
  const concat = accountsArbitrum.concat(accountsAvalanche);
  const accounts = Array.from(new Set(concat));

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
    const requestedCreditArb = await creditRequestContractArb.getRequestedCredit(address);
    const requestedCreditAvax = await creditRequestContractAvax.getRequestedCredit(address);

    const result: FilteredAccountData = {
      address,
      creditData,
      currentBalance,
      requestedCreditArb: utils.formatUnits(requestedCreditArb, 18),
      requestedCreditAvax: utils.formatUnits(requestedCreditAvax, 18),
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
