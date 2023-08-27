import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';

import contractArtifact from '@/contract-hardhat/artifacts/contracts/CreditRequest.sol/CreditRequest.json';

export default function CreditRequest() {
  const [amount, setAmount] = useState('');
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config } = usePrepareContractWrite({
    address: '0x1646b92dc747103ec0F6E71914B8Eca18ca21648',
    abi: contractArtifact.abi,
    functionName: parseInt(debouncedAmount) >= 0 ? 'increaseRequest' : 'decreaseRequest',
    args: [parseInt(debouncedAmount)],
    enabled: Boolean(debouncedAmount),
  });

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
        <button type="submit" disabled={!write || isLoading} className="ml-4">
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
