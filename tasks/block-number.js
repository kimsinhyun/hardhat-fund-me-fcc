const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
  // annoymous function (JS) 함수 이름이 없는 함수
  // hre => hardhat runtime environment
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block Number: ${blockNumber}`)
  }
)
