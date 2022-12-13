import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0xA66DBF9af5935939c0DbAEaA75ba20b9DacCc720", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "XXisp Card",
        description: "This NFT will give you access to XXisp-DAO!",
        image: readFileSync("scripts/assets/headband.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();