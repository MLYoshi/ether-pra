const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545",
    null,
    { cacheTimeout: 5000 } // 你的 RPC 服务器地址
  );
  const wallet = new ethers.Wallet(
    "0x771f7d1517686830bf002b3074c3f82b555c05300b212af38ab2e830785a4ee8",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying ,pls wait...");

  const contract = await contractFactory.deploy({ gasLimit: 1000000 });

  await contract.deployTransaction.wait(1);

  //get number
  const currentFavorNumber = await contract.retrieve();
  console.log(currentFavorNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("eeeeeeeeeerror");
    console.error(error);
    process.exit(1);
  });
