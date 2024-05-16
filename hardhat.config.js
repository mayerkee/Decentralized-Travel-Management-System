require("@nomiclabs/hardhat-waffle")
//require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("@nomicfoundation/hardhat-verify");
//require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "http://sepolia";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xhfs";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0eavxx";
//const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0xhgaa"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmation: 1,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [],
  },
  solidity: {
    compilers: [
      { version: "0.8.24" },
      { version: "0.8.20" },
      { version: "0.4.19" },
      { version: "0.6.12" },
      { version: "0.6.0" },
      { version: "0.8.19" },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
};
