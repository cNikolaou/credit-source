import { ethers } from 'ethers';

import contractArtifact from '@/contract-hardhat/artifacts/contracts/CreditRequest.sol/CreditRequest.json';

const network = process.env.NETWORK === 'mainnet' ? 'arbitrum' : 'arbitrum-goerli';

const provider = new ethers.providers.AlchemyProvider(
  network,
  process.env.ALCHEMY_API_KEY_ARBITRUM,
);

const creditRequestContract = new ethers.Contract(
  '0x1646b92dc747103ec0F6E71914B8Eca18ca21648',
  contractArtifact.abi,
  provider,
);

export default creditRequestContract;
