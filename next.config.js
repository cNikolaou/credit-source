/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NETWORK: 'goerli',
    CREDIT_REQUEST_CONTRACT_ADDRESS: '0x1646b92dc747103ec0F6E71914B8Eca18ca21648',
  },
};

module.exports = nextConfig;
