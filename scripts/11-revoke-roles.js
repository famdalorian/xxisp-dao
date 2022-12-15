import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const token = await sdk.getContract("0x13100136EDf17BB60BD6d7b88299665B40468247", "token");

    const allRoles = await token.roles.getAll();

    console.log("👀 Roles that exist right now:", allRoles);

    
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "🎉 Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");

  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO trasury", error);
  }
})();