const ethers = require('ethers');

// Alice account
const YOUR_PRIVATE_KEY = '0x28194e8ddb4a2f2b110ee69eaba1ee1f35e88da2222b5a7d6e3afa14cf7a3347';
const USE_LEGACY = true;
const LEGACY_GAS_PRICE_MULTIPLIER = 1.1;

// Create provider & wallet
const providerRPC = {
  moonbase: {
    name: 'moonbase-alpha',
    rpc: 'https://rpc.api.moonbase.moonbeam.network', // Insert your RPC URL here
    chainId: 1287, // 0x504 in hex,
  },
};
const provider = new ethers.providers.JsonRpcProvider(providerRPC.moonbase.rpc, {
  chainId: providerRPC.moonbase.chainId,
  name: providerRPC.moonbase.name,
});
let wallet = new ethers.Wallet(YOUR_PRIVATE_KEY, provider);

// Create contract factory
const bytecode =
  '0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea264697066735822122072e42d8ce2de741e302e1d0678067f873b1b8121729d3ac40b0101241e05cc1564736f6c63430008110033';
const abi = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }];
const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

// Deploy
const deploy = async () => {
  console.log(`Attempting to deploy from account: ${wallet.address}`);

  // Deploy 10 times. Usually there is a hangup
  for (let i = 0; i < 10; i++) {
    // Send transaction
    let tx;
    if (USE_LEGACY)
      tx = await contractFactory.deploy({
        type: 0,
        gasPrice: LEGACY_GAS_PRICE_MULTIPLIER * (await provider.getGasPrice()),
      });
    else tx = await contractFactory.deploy();

    // Monitor
    console.log('Sent transaction', {
      hash: tx.deployTransaction.hash,
      type: tx.deployTransaction.type,
      gasPrice: tx.deployTransaction.gasPrice,
      nonce: tx.deployTransaction.nonce,
      url: `https://moonbase.moonscan.io/tx/${tx.deployTransaction.hash}`
    });
    await tx.deployed();
    console.log(`Lock ${i + 1} deployed:`, tx.address);
  }
};

// Call the deploy function
deploy();