import { AccountData } from '@/lib/account-data';

interface RequesterListProps {
  data: AccountData[];
}

export default function RequesterList({ data }: RequesterListProps) {
  return (
    <>
      {data.map((acc) => (
        <div className="card" key={acc.address}>
          <h2>{acc.address.toUpperCase()}</h2>
          <p>Trusted by: {acc.creditData.ethereum.trustedBy} accounts in Ethereum</p>
          <p>Trusted by: {acc.creditData.arbitrum.trustedBy} accounts in Arbitrum</p>
          <hr />
          <p>Trusted Credit in Ethereum: {acc.creditData.ethereum.trustedCredit}</p>
          <p>Trusted Credit in Arbitrum: {acc.creditData.arbitrum.trustedCredit}</p>
          <hr />
          <p>{acc.currentBalance.eth} ETH</p>
          <p>{acc.currentBalance.arb} ARB</p>
          <p>{acc.currentBalance.op} OP</p>
        </div>
      ))}
    </>
  );
}