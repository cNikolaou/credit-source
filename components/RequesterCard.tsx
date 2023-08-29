import { AccountData, FilteredAccountData } from '@/lib/account-data';

interface RequesterCardProps {
  data: AccountData | FilteredAccountData;
}

export default function RequesterCard({ data }: RequesterCardProps) {
  return (
    <div className="bg-white p-6 rounded shadow-lg mb-4">
      <h2 className="text-gray-800 text-lg font-bold">{data.address}</h2>
      <h3 className="text-gray-600 text-md">
        Requested Credit in Arbitrum: {data.requestedCreditArb} DAI
      </h3>
      <h3 className="text-gray-600 text-md mb-4">
        Requested Credit in Avalanche: {data.requestedCreditAvax} DAI
      </h3>
      <ul className="list-disc list-inside text-gray-700 list-none">
        <li>Trusted by: {data.creditData.ethereum.trustedBy} accounts in Ethereum</li>
        <li>Trusted by: {data.creditData.arbitrum.trustedBy} accounts in Arbitrum</li>
        <hr />
        <li>Trusted Credit in Ethereum: {data.creditData.ethereum.trustedCredit}</li>
        <li>Trusted Credit in Arbitrum: {data.creditData.arbitrum.trustedCredit}</li>
        <hr />
        <li>Amount Borrowed in Ethereum: {data.creditData.ethereum.borrowedAmount}</li>
        <li>Amount Borrowed in Arbitrum: {data.creditData.arbitrum.borrowedAmount}</li>
        <hr />
        <li>Credit Repaid in Ethereum: {data.creditData.ethereum.repaidAmount}</li>
        <li>Credit Repaid in Arbitrum: {data.creditData.arbitrum.repaidAmount}</li>
        <hr />
        <li>{data.currentBalance.eth} ETH</li>
        <li>{data.currentBalance.arb} ARB</li>
        <li>{data.currentBalance.avax} AVAX</li>
        <hr />
        {'tokenBalances' in data && (
          <>
            <hr />
            <h3>Token Balances</h3>
            {data.tokenBalances?.map((token) => (
              <p>
                Contract {token.tokenAddress} has {token.balance}
              </p>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
