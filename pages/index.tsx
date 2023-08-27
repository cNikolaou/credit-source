import { getAccountData, AccountData } from '@/lib/account-data';

import RequesterPane from '@/components/RequesterPane';
import ProfileConnect from '@/components/ProfileConnect';

interface HomeProps {
  accountData: AccountData[];
}

export default function Home({ accountData }: HomeProps) {
  return (
    <>
      <h1>Credit Source</h1>
      <ProfileConnect />
      <RequesterPane initialData={accountData} />
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data
  const accountData = await getAccountData();

  return { props: { accountData } };
}
