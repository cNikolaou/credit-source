require('@nomicfoundation/hardhat-toolbox');

const ALCHEMY_API_KEY_ARBITRUM = 'YSy9bkhUEuOcKS2P3D5zDElA5O5apuOA';
const GOERLI_PRIVATE_KEY = '36e82bda23fb9afaecd248152b7b0f09cf16a315cc90f920d11b112402a5ed4a';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    goerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY_ARBITRUM}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      chainId: 421613,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
