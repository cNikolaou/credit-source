import { getAccountCreditData, AccountCreditData } from '@/lib/credit';
import { getBalance, AccountCurrentBalance } from '@/lib/token';

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
