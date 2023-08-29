import { Contract, ethers } from 'ethers';

import contractArtifact from '@/contract-hardhat/artifacts/contracts/CreditRequest.sol/CreditRequest.json';

const arbitrumNetwork = process.env.NETWORK === 'mainnet' ? 'arbitrum' : 'arbitrum-goerli';

const providerArbitrum = new ethers.providers.AlchemyProvider(
  arbitrumNetwork,
  process.env.ALCHEMY_API_KEY_ARBITRUM,
);

let creditRequestContractArb: Contract;
let creditRequestContractAvax: Contract;

if (process.env.CREDIT_REQUEST_CONTRACT_ADDRESS_ARB) {
  creditRequestContractArb = new ethers.Contract(
    process.env.CREDIT_REQUEST_CONTRACT_ADDRESS_ARB,
    contractArtifact.abi,
    providerArbitrum,
  );
}

const avalancheNetwork =
  process.env.NETWORK === 'mainnet'
    ? `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
    : `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_API_KEY}`;

const providerAvalanche = new ethers.providers.JsonRpcProvider(avalancheNetwork);

if (process.env.CREDIT_REQUEST_CONTRACT_ADDRESS_AVAX) {
  creditRequestContractAvax = new ethers.Contract(
    process.env.CREDIT_REQUEST_CONTRACT_ADDRESS_AVAX,
    contractArtifact.abi,
    providerAvalanche,
  );
}

export { creditRequestContractArb, creditRequestContractAvax, providerAvalanche };
