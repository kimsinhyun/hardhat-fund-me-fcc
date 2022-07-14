const { network } = require("hardhat")
const {
  developmentChains,
  DECIMALS,
  INITIAL_PRICE
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  if (chainId == 31337) {
    //   혹은if (developmentChains.includes(network.name)) {
    log("local network detected! Deploying mocks...")
    // MockV3Aggregator는 decimals 와 initial answer 두개의 파라미터를 받기 때문
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE]
    })
    log("Mocks deployed!")
    log("---------------------------------------")
  }
}

module.exports.tags = ["all", "mocks"]
