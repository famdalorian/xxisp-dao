import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      
      name: "XXisp Card",
     
      description: "XXISP DAO.",
      
      image: readFileSync("scripts/assets/naruto.png"),
     
      primary_sale_recipient: "0xc1209F7a2f72240a1d3Ed9f5a71c8229Fe4ad6aD",
    });

   
    const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");

    
    const metadata = await editionDrop.metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress,
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();