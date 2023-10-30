require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/P3iuHSKcY0HIb3RR0v1gSV0HITFx_F2G",
      accounts: ["0x3e74cc21b1f0017a14469b362ed4ab00f3aa099517abf0bd0403c11e00b6f65d"]
    } 
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
