// import
// main function
// callnig of main function

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

// function deployFunc() {
//   console.log("Hi")
// }
//// module.exports.defalut => main 함수를 지정해주는 용도
// module.exports.defalut = deployFunc

// module.exports.defalut => main 함수를 지정해주는 용도
// getNamedAccounts, deployments => hre 안의 variable(object)

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  //if chainId is X use address(price feed) Y
  let ethUsdPriceFeedAddress
  if (developmentChains.includes(network.name)) {
    const ehtUsdAggregator = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ehtUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
  }
  //(mocking) => if the contract doesn't exist, we deploy a minimal version of
  //for local testing

  //hardhat 혹은 localhost network에선 mocking 사용
  // 또한 chian이 변경 됐을 때 aggregator를 바꿔줄 필요없이 자동화함 -> FundMe contructor 안에 arg로 price feed 입력
  const funMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], // price feed
    log: true
  })
  log("---------------------------------")
}

module.exports.tags = ["all", "fundme"]
