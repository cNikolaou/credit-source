import { getAccountData, AccountData } from '@/lib/account-data';

import RequesterPane from '@/components/RequesterPane';
import ProfileConnect from '@/components/ProfileConnect';
import CreditRequest from '@/components/CreditRequest';

import { useAccount } from 'wagmi';

interface HomeProps {
  accountData: AccountData[];
}

export default function Home({ accountData }: HomeProps) {
  const account = useAccount();

  return (
    <>
      <h1>Credit Source</h1>
      <ProfileConnect />
      {account.isConnected && <CreditRequest />}
      <RequesterPane initialData={accountData} />
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data
  const accountData = await getAccountData();

  return { props: { accountData } };
}
