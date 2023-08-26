const accounts = [
  '0x5DA3C2c0250D311B2763bdf3cfa49C0f4a219987',
  '0xfc32e7c7c55391ebb4f91187c91418bf96860ca9',
];

export async function getAccountData() {
  const accountData = accounts.map((acc) => {
    return {
      address: acc,
    };
  });

  return accountData;
}
