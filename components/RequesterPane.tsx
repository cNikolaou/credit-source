import { useState } from 'react';

import RequesterList from './RequesterList';
import type { AccountData } from '@/lib/account-data';

interface RequesterPaneProps {
  initialData: AccountData[];
}

export default function RequesterPane({ initialData }: RequesterPaneProps) {
  const [data, setData] = useState(initialData);

  return (
    <>
      <RequesterList data={data}></RequesterList>
    </>
  );
}
