import { Network, Alchemy } from 'alchemy-sdk';
import { utils } from 'ethers';

const settingsEthereum = {
  apiKey: process.env.ALCHEMY_API_KEY_ETHEREUM,
  network: process.env.NETWORK ? Network.ETH_MAINNET : Network.ETH_GOERLI,
};

const settingsArbitrum = {
  apiKey: process.env.ALCHEMY_API_KEY_ARBITRUM,
  network: process.env.NETWORK ? Network.ARB_MAINNET : Network.ARB_GOERLI,
};

const settingsOptimism = {
  apiKey: process.env.ALCHEMY_API_KEY_OPTIMISM,
  network: process.env.NETWORK ? Network.OPT_MAINNET : Network.OPT_GOERLI,
};

const alchemyEthereum = new Alchemy(settingsEthereum);
const alchemyArbitrum = new Alchemy(settingsArbitrum);
const alchemyOptimism = new Alchemy(settingsOptimism);

type UserAddress = string;

export type AccountCurrentBalance = {
  eth: string;
  arb: string;
  op: string;
};

export async function getBalance(userAddress: UserAddress): Promise<AccountCurrentBalance> {
  // Fetch the balance of each network's native currency
  // for a specific user account

  const ethBalance = await alchemyEthereum.core.getBalance(userAddress);
  const arbBalance = await alchemyArbitrum.core.getBalance(userAddress);
  const optBalance = await alchemyOptimism.core.getBalance(userAddress);

  const networkBalances: AccountCurrentBalance = {
    eth: parseFloat(utils.formatEther(ethBalance)).toFixed(5),
    arb: parseFloat(utils.formatEther(arbBalance)).toFixed(5),
    op: parseFloat(utils.formatEther(optBalance)).toFixed(5),
  };

  return networkBalances;
}
