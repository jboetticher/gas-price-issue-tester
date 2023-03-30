// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
async function main() {

  console.log("Starting Lock deployment...");

  for(let i = 0; i < 10; i++) {
    // const Lock = await ethers.getContractFactory("Lock");
    const EmptyContract = await ethers.getContractFactory("EmptyContract");

    const [deployer] = await ethers.getSigners();
    // const lock = await Lock.deploy(1780124779, { gasPrice: await deployer.getGasPrice() });
    const lock = await EmptyContract.deploy({ gasPrice: await deployer.getGasPrice() });
    console.log("Sent transaction", { hash: lock.deployTransaction.hash, gasPrice: lock.deployTransaction.gasPrice, nonce: lock.deployTransaction.nonce});
  
    await lock.deployed();
  
    console.log(`Lock ${i + 1} deployed:`, lock.address)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Oddly enough, the gas price displayed here are much higher than those suggested in the devops-dao-diamond project

// Here:    9736953125  /   1658269663
// DevOps:  125000000   /   125021038

