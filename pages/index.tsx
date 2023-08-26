import { getAccountData } from '@/lib/account-data';

export default function Home({ accountData }) {
  return (
    <>
      <h1>Credit Source</h1>
      {accountData.map((acc) => (
        <div className="card">
          <h2>{acc.address.toUpperCase()}</h2>
          <p>Trusted by: {acc.creditData.ethereum.trustedBy} accounts in Ethereum</p>
          <p>Trusted by: {acc.creditData.arbitrum.trustedBy} accounts in Arbitrum</p>
          <hr />
          <p>Trusted Credit in Ethereum: {acc.creditData.ethereum.trustedCredit}</p>
          <p>Trusted Credit in Arbitrum: {acc.creditData.arbitrum.trustedCredit}</p>
        </div>
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
