import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

(async () => {
  try {
    // This is our governance contract.
    const vote1 = await sdk.getContract("0xB290E3B6185DcB41a7D8f3d85f2a50E2F95bc2A6", "vote");
    // This is our ERC-20 contract.
    const token1 = await sdk.getContract("0x13100136EDf17BB60BD6d7b88299665B40468247", "token");
    // Create proposal to mint 420,000 new token to the treasury.
    const amount1 = 420_000;
    const description1 = "Should the DAO mint an additional " + amount1 + " tokens into the treasury?";
    const executions = [
      {
        // Our token contract that actually executes the mint.
        toAddress: token1.getAddress(),
        // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
        // to send in this proposal. In this case, we're sending 0 ETH.
        // We're just minting new tokens to the treasury. So, set to 0.
        nativeTokenValue: 0,
        // We're doing a mint! And, we're minting to the vote, which is
        // acting as our treasury.
        // in this case, we need to use ethers.js to convert the amount
        // to the correct format. This is because the amount it requires is in wei.
        transactionData: token1.encoder.encode(
          "mintTo", [
          vote1.getAddress(),
          ethers.utils.parseUnits(amount1.toString(), 18),
        ]
        ),
      }
    ];
    // This is our governance contract.
    const vote = await sdk.getContract("0xB290E3B6185DcB41a7D8f3d85f2a50E2F95bc2A6", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0x13100136EDf17BB60BD6d7b88299665B40468247", "token");
    // Create proposal to mint 420,000 new token to the treasury.
    const amount = 20_000;
    const description = "Should the DAO send an additional " + amount + " tokens into buying equipment?";
    

    await vote.propose(description, executions);

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    // This is our governance contract.
    const vote = await sdk.getContract("0xB290E3B6185DcB41a7D8f3d85f2a50E2F95bc2A6", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0x13100136EDf17BB60BD6d7b88299665B40468247", "token");
    // Create proposal to transfer ourselves 6,900 tokens for being awesome.
    const amount = 6_900;
    const description = "Should the DAO transfer " + amount + " tokens from the treasury to " +
      process.env.WALLET_ADDRESS + " for being awesome?";
    const executions = [
      {
        // Again, we're sending ourselves 0 ETH. Just sending our own token.
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          // We're doing a transfer from the treasury to our wallet.
          "transfer",
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: token.getAddress(),
      },
    ];

    await vote.propose(description, executions);

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();