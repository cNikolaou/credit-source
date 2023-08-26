import { getAccountData } from '@/lib/account-data';

export default function Home({ accountData }) {
  return (
    <>
      <h1>Credit Source</h1>
      {accountData.map((acc) => (
        <h2>{acc.address.toUpperCase()}</h2>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data
  const accountData = await getAccountData();
  console.log(accountData);

  return { props: { accountData } };
}
