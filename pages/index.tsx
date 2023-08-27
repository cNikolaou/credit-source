import { getAccountData, AccountData } from '@/lib/account-data';
import { Inter } from 'next/font/google';

import RequesterPane from '@/components/RequesterPane';
import NavigationBar from '@/components/NavigationBar';

interface HomeProps {
  accountData: AccountData[];
}

const inter = Inter({ subsets: ['latin'] });

export default function Home({ accountData }: HomeProps) {
  return (
    <>
      <NavigationBar />
      <div className="container mx-auto px-4 mt-6">
        <RequesterPane initialData={accountData} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data
  const accountData = await getAccountData();

  return { props: { accountData } };
}
