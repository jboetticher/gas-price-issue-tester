const ethers = require('ethers');

// 2. Define network configurations
const providerRPC = {
  moonbase: {
    name: 'moonbase-alpha',
    rpc: 'https://rpc.api.moonbase.moonbeam.network', // Insert your RPC URL here
    chainId: 1287, // 0x504 in hex,
  },
};
// 3. Create ethers provider
const provider = new ethers.JsonRpcProvider(
  providerRPC.moonbase.rpc, 
  {
    chainId: providerRPC.moonbase.chainId,
    name: providerRPC.moonbase.name,
  }
);


const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// 3. Create account variables
const account_from = {
  privateKey: 'YOUR-PRIVATE-KEY-HERE',
};

// 5. Create wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

// 6. Create contract instance with signer
const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

// 7. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account: ${wallet.address}`);

  // Deploy 10 times. Usually there is a hangup
  for(let i = 0; i < 10; i++) {
    const tx = await contractFactory.deploy();
    console.log("Sent transaction", { hash: tx.deployTransaction.hash, gasPrice: tx.deployTransaction.gasPrice, nonce: tx.deployTransaction.nonce});
    await tx.deployed();
    console.log(`Lock ${i + 1} deployed:`, tx.address)
  }
};

// 9. Call the deploy function
deploy();

