import type { NextApiRequest, NextApiResponse } from 'next';

import { getAccountFilteredData, FilteredAccountData } from '@/lib/account-data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FilteredAccountData[]>,
) {
  if (req.method === 'POST') {
    try {
      const filteredData = await getAccountFilteredData(JSON.parse(req.body));
      res.status(200).json(filteredData);
    } catch (error) {
      res.status(400);
    }
  } else {
    res.status(400);
  }
}
