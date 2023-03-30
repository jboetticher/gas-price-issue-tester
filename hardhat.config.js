require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

const fs = require("fs");

let keys;
const keysJSON = fs.readFileSync(`./keys.json`);
keys = JSON.parse(keysJSON);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    moonbase: {
      // url: `https://moonbase-alpha.blastapi.io/5adb17c5-f79f-4542-b37c-b9cf98d6b28f`,
      // url: `https://moonbeam-alpha.api.onfinality.io/rpc?apikey=a574e9f5-b1db-4984-8362-89b749437b81`,
      url: "https://rpc.api.moonbase.moonbeam.network",
      // url: "https://moonbase.unitedbloc.com:1000",
      chainId: 1287,
      accounts: {
        mnemonic: keys.mnemonic1,
      },
    }
  }
};
