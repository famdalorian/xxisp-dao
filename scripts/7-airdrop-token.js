import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0x47ed572e12C4746206F357B6A25Cb8709D3Ef9Ef", "edition-drop");
    const token = await sdk.getContract("0x13100136EDf17BB60BD6d7b88299665B40468247", "token");
    
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();