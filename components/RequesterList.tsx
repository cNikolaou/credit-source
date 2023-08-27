import RequesterCard from '@/components/RequesterCard';

import { AccountData, FilteredAccountData } from '@/lib/account-data';

interface RequesterListProps {
  data: AccountData[] | FilteredAccountData[];
}

export default function RequesterList({ data }: RequesterListProps) {
  return (
    <>
      {data.map((acc) => (
        <RequesterCard data={acc} key={acc.address} />
      ))}
    </>
  );
}
