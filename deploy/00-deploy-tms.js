const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (chainId == 31337) {
    log("Local network detected! Deploying mocks...");
    await deploy("Tms", {
      from: deployer,
      log: true,
      args: [],
    });
  }

  log("Mocks Deployed!");
};

module.exports.tags = ["all", "tms"];
