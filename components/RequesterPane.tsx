import { useState } from 'react';
import { useAccount } from 'wagmi';

import RequesterList from './RequesterList';
import FilterForm from './FilterForm';
import CreditRequest from '@/components/CreditRequest';
import type { AccountData, Addresses } from '@/lib/account-data';

interface RequesterPaneProps {
  initialData: AccountData[];
}

export default function RequesterPane({ initialData }: RequesterPaneProps) {
  const [data, setData] = useState(initialData);

  const account = useAccount();

  async function handleFilterChange(addresses: Addresses[]) {
    try {
      const res = await fetch('/api/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'applications/json',
        },
        body: JSON.stringify(addresses),
      });

      if (!res.ok) {
        console.error('Error while fetching the new data');
        throw new Error('API response was not ok');
      }

      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="w-1/2">
          <div className={account.isConnected ? 'opacity-1' : 'opacity-0'}>
            <CreditRequest />
          </div>
          <div className="mt-8">
            <FilterForm onApplyFilter={handleFilterChange} />
          </div>
        </div>
        <div className="w-1/2">
          <RequesterList data={data}></RequesterList>
        </div>
      </div>
    </>
  );
}
