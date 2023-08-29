import { useState, ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';

import contractArtifact from '@/contract-hardhat/artifacts/contracts/CreditRequest.sol/CreditRequest.json';

const CHAIN_CONTRACT_MAP = new Map<string, `0x${string}`>([
  ['Arbitrum', process.env.CREDIT_REQUEST_CONTRACT_ADDRESS_ARB as `0x${string}`],
  ['Avalanche', process.env.CREDIT_REQUEST_CONTRACT_ADDRESS_AVAX as `0x${string}`],
]);

export default function CreditRequest() {
  const [amount, setAmount] = useState('');
  const [debouncedAmount] = useDebounce(amount, 500);
  const [chain, setChain] = useState('Avalanche');

  const { config } = usePrepareContractWrite({
    address: CHAIN_CONTRACT_MAP.get(chain),
    abi: contractArtifact.abi,
    functionName: parseInt(debouncedAmount) >= 0 ? 'increaseRequest' : 'decreaseRequest',
    args: [parseInt(debouncedAmount) * 10 ** 18],
    enabled: Boolean(debouncedAmount),
  });

  function handleChainChange(event: ChangeEvent<HTMLSelectElement>) {
    setChain(event.target.value);
  }

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="mb-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
          setAmount('');
        }}
      >
        <label htmlFor="amount" className="mr-4">
          Amount of DAI
        </label>
        <input
          id="amount"
          aria-label="Amount (ether)"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          value={amount}
          className="p-2 border border-gray-300 rounded w-1/2"
        />
        <select
          value={chain}
          onChange={(event) => handleChainChange(event)}
          className="p-2 border border-gray-300 rounded ml-2"
        >
          <option value="Avalanche">Avalanche</option>
          <option value="Arbitrum">Arbitrum</option>
        </select>
        <button type="submit" disabled={!write || isLoading} className="ml-2">
          {isLoading ? 'Updating...' : 'Update'}
        </button>
        {isSuccess && (
          <div>
            Successfully minted your NFT!
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
