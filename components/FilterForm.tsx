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
      {addresses.map((address, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Token or NFT Contract Address"
            value={address.address}
            onChange={(event) => handleAddressChange(index, event)}
          />
          <select value={address.type} onChange={(event) => handleTypeChange(index, event)}>
            <option value="token">Token</option>
            <option value="nft">NFT</option>
          </select>
          <select value={address.chain} onChange={(event) => handleChainChange(index, event)}>
            <option value="Ethereum">Ethereum</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Optimism">Optimism</option>
          </select>
          <button type="button" onClick={() => handleDeleteFilter(index)}>
            Delete
          </button>
        </div>
      ))}
      <div>
        <button type="button" onClick={handleAddAddress}>
          Add Another Address
        </button>
      </div>
      <div>
        <button type="submit">Apply Filter</button>
      </div>
    </form>
  );
}
