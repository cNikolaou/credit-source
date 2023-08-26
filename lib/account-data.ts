import { getAccountCreditData, AccountCreditData } from '@/lib/credit';
import {
  getBalance,
  AccountCurrentBalance,
  AccountCurrentTokenBalance,
  getTokenBalance,
  Chain,
} from '@/lib/token';

const accounts = [
  '0x5DA3C2c0250D311B2763bdf3cfa49C0f4a219987',
  '0xfc32e7c7c55391ebb4f91187c91418bf96860ca9',
];

export type AccountData = {
  address: string;
  creditData: AccountCreditData;
  currentBalance: AccountCurrentBalance;
};

export async function getAccountData(): Promise<AccountData[]> {
  // fetch data for all accounts that are requesting additional credit

  const accountDataPromises = accounts.map(async (address) => {
    const creditData = await getAccountCreditData(address);
    const currentBalance = await getBalance(address);

    return {
      address: address,
      creditData: creditData,
      currentBalance: currentBalance,
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
    } else {
      console.log('NO FILTER');
    }

    return result;
  });

  let accountData = await Promise.all(accountDataPromises);

  if (accountData.some((item) => item.tokenBalances !== undefined)) {
    const greaterThanZero = (accBalance: AccountCurrentTokenBalance) => accBalance.balance > 0;
    accountData = accountData.filter((account) => account.tokenBalances!.every(greaterThanZero));
  }

  console.log(accountData);

  return accountData;
}
