require('@nomicfoundation/hardhat-toolbox');

const ALCHEMY_API_KEY_ARBITRUM = process.env.ALCHEMY_API_KEY;
const EVM_PRIVATE_KEY = process.env.EVM_DEV_PRIV_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    goerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY_ARBITRUM}`,
      accounts: [EVM_PRIVATE_KEY],
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      chainId: 421613,
      accounts: [EVM_PRIVATE_KEY],
    },
    avalancheFiji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [EVM_PRIVATE_KEY],
    },
  },
};
