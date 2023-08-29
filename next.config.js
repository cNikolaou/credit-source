/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NETWORK: 'goerli',
    CREDIT_REQUEST_CONTRACT_ADDRESS_ARB: '0x1646b92dc747103ec0F6E71914B8Eca18ca21648',
    CREDIT_REQUEST_CONTRACT_ADDRESS_AVAX: '0x57EA8388331C46bd56a1D6d3010C2bF17a10745d',
  },
};

module.exports = nextConfig;
