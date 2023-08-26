import { useState } from 'react';

import RequesterList from './RequesterList';
import FilterForm from './FilterForm';
import type { AccountData, Addresses } from '@/lib/account-data';

interface RequesterPaneProps {
  initialData: AccountData[];
}

export default function RequesterPane({ initialData }: RequesterPaneProps) {
  const [data, setData] = useState(initialData);

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
      <FilterForm onApplyFilter={handleFilterChange} />
      <RequesterList data={data}></RequesterList>
    </>
  );
}
