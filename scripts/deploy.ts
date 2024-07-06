import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { abi, bytecode } from "../artifacts/contracts/Example.sol/Example.json";
import dotenv from "dotenv";
import { createWalletClient, Hex, http, publicActions } from "viem";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(process.env.BASE_SEPOLIA_RPC_URL),
  }).extend(publicActions);

  const hash = await client.deployContract({
    abi,
    bytecode: `0x${bytecode.slice(2)}`,
  });

  const receipt = await client.waitForTransactionReceipt({
    confirmations: 1,
    hash,
  });

  console.log(receipt);
  console.log(`Contract deployed at: ${await receipt.contractAddress}`);
})();
