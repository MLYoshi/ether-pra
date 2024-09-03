const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:8090",
    null,
    { cacheTimeout: 5000 } // 你的 RPC 服务器地址
  );
  const wallet = new ethers.Wallet(
    "0x7fd73690d6f32bea91a11e53e6e530c7dbe6639c981b2f611cf156c9ea97fa3a",
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

  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("eeeeeeeeeerror");
    console.error(error);
    process.exit(1);
  });
