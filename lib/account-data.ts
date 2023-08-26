import { getAccountCreditData } from '@/lib/credit';
import type { AccountCreditData } from '@/lib/credit';

const accounts = [
  '0x5DA3C2c0250D311B2763bdf3cfa49C0f4a219987',
  '0xfc32e7c7c55391ebb4f91187c91418bf96860ca9',
];

export type AccountData = {
  address: string;
  creditData: AccountCreditData;
};

export async function getAccountData(): Promise<AccountData[]> {
  // fetch data for all accounts that are requesting additional credit

  const accountDataPromises = accounts.map(async (address) => {
    const creditData = await getAccountCreditData(address);

    return {
      address: address,
      creditData: creditData,
    };
  });

  const accountData = await Promise.all(accountDataPromises);

  return accountData;
}
