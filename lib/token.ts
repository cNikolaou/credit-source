import { Network, Alchemy, TokenBalancesResponse } from 'alchemy-sdk';
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

export type Chain = 'Ethereum' | 'Arbitrum' | 'Optimism';

type TokenContractAddress = {
  address: string;
  chain: Chain;
};

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

export type AccountCurrentTokenBalance = {
  tokenAddress: string;
  chain: Chain;
  balance: number;
};

function processTokenBalancesResponse(
  tokenBalances: TokenBalancesResponse,
  chain: Chain,
): AccountCurrentTokenBalance[] {
  // Post process data token data received by the Alchemy API

  const data = tokenBalances.tokenBalances
    .filter((balance) => balance.tokenBalance !== null)
    .map((balance) => {
      return {
        tokenAddress: balance.contractAddress,
        chain: chain,
        balance: parseFloat(utils.formatEther(balance.tokenBalance!)),
      };
    });

  return data;
}

export async function getTokenBalance(
  userAddress: UserAddress,
  tokenContractAddresses: TokenContractAddress[],
): Promise<AccountCurrentTokenBalance[]> {
  // Split the token requests based on the chain that the contracts refer to
  // fetch the data for each chain from Alchemy API and then
  // accumulate the data into the result array

  const ethereumTokens = tokenContractAddresses
    .filter((address) => address.chain === 'Ethereum')
    .map((addressData) => addressData.address);
  const arbitrumTokens = tokenContractAddresses
    .filter((address) => address.chain === 'Arbitrum')
    .map((addressData) => addressData.address);
  const optimismTokens = tokenContractAddresses
    .filter((address) => address.chain === 'Optimism')
    .map((addressData) => addressData.address);

  let result: AccountCurrentTokenBalance[] = [];

  if (ethereumTokens.length > 0) {
    try {
      const tokenBalances = await alchemyEthereum.core.getTokenBalances(
        userAddress,
        ethereumTokens,
      );
      const data = processTokenBalancesResponse(tokenBalances, 'Ethereum');
      result = [...result, ...data];
    } catch (error) {
      console.error(error);
      throw new Error('Not valid contract_addresses');
    }
  }

  if (arbitrumTokens.length > 0) {
    try {
      const tokenBalances = await alchemyArbitrum.core.getTokenBalances(
        userAddress,
        arbitrumTokens,
      );
      const data = processTokenBalancesResponse(tokenBalances, 'Arbitrum');
      result = [...result, ...data];
    } catch (error) {
      console.error(error);
      throw new Error('Not valid contract_addresses');
    }
  }

  if (optimismTokens.length > 0) {
    try {
      const tokenBalances = await alchemyOptimism.core.getTokenBalances(
        userAddress,
        optimismTokens,
      );
      const data = processTokenBalancesResponse(tokenBalances, 'Optimism');
      result = [...result, ...data];
    } catch (error) {
      console.error(error);
      throw new Error('Not valid contract_addresses');
    }
  }

  return result;
}
