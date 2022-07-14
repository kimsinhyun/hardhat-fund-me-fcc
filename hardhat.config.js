require("@nomicfoundation/hardhat-toolbox")
// require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
// require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      // accounts: [privateKey0,privateKey1,privateKey2],
      accounts: [PRIVATE_KEY],
      chainId: 4
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: hardhat에서 이미 제공해줌
      chainId: 31337
    }
  },
  // solidity: "0.8.8",
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }]
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    // noColors: true,
    currency: "USD",
    gasPrice: 21,
    //coin 시세 확인 API
    coinmarketcap: COINMARKETCAP_API_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0, //default로 chainId가 0인(hardhat network) 네트워크를 사용
      4: 1 // 4:1 ->chainId가 4인(Rinkeby) 네트퉈크를  그 다음으로 사용
    },
    users: {
      default: 1
    }
  }
}
