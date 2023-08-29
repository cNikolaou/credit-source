import { useState, ChangeEvent, FormEvent } from 'react';

import { Addresses } from '@/lib/account-data';
import { Chain } from '@/lib/token';

interface FilterFormProps {
  onApplyFilter: (addresses: Addresses[]) => void;
}

export default function FilterForm({ onApplyFilter }: FilterFormProps) {
  // Add `FilterForm` component to allow adding filters and make
  // an API request to the backend that will return only the
  // Requester addresses that are not excluded by the filter.

  const [addresses, setAddresses] = useState<Addresses[]>([
    { address: '', type: 'token', chain: 'Ethereum' },
  ]);

  function handleAddressChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const newAddresses = addresses.slice();
    newAddresses[index].address = event.target.value;
    setAddresses(newAddresses);
  }

  function handleTypeChange(index: number, event: ChangeEvent<HTMLSelectElement>) {
    const newAddresses = addresses.slice();
    newAddresses[index].type = event.target.value;
    setAddresses(newAddresses);
  }

  function handleChainChange(index: number, event: ChangeEvent<HTMLSelectElement>) {
    const newAddresses = addresses.slice();
    newAddresses[index].chain = event.target.value as Chain;
    setAddresses(newAddresses);
  }

  function handleDeleteFilter(index: number) {
    const newAddresses = addresses.slice();
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  }

  function handleAddAddress() {
    setAddresses([...addresses, { address: '', type: 'token', chain: 'Ethereum' }]);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onApplyFilter(addresses);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <button type="button" onClick={handleAddAddress} className="mr-4">
          Add Another Address
        </button>
        <button type="submit" className="">
          Apply Filters
        </button>
      </div>
      {addresses.map((address, index) => (
        <div key={index} className="mt-2">
          <input
            type="text"
            placeholder="Token or NFT Contract Address"
            value={address.address}
            onChange={(event) => handleAddressChange(index, event)}
            className="p-2 border border-gray-300 rounded w-1/2"
          />
          <select
            value={address.type}
            onChange={(event) => handleTypeChange(index, event)}
            className="p-2 border border-gray-300 rounded ml-2"
          >
            <option value="token">Token</option>
            <option value="nft">NFT</option>
          </select>
          <select
            value={address.chain}
            onChange={(event) => handleChainChange(index, event)}
            className="p-2 border border-gray-300 rounded ml-2"
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Optimism">Optimism</option>
            <option value="Avalanche">Avalanche</option>
          </select>
          <button type="button" onClick={() => handleDeleteFilter(index)} className="ml-2">
            Delete
          </button>
        </div>
      ))}
    </form>
  );
}
