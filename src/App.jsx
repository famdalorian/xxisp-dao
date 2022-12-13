import {
  useAddress,
  ConnectWallet,
  useContract,
  Web3Button,
  useNFTBalance,
} from "@thirdweb-dev/react";
import { useState, useEffect, useMemo } from "react";

const App = () => {
  const address = useAddress();
  console.log("👋 Address:", address);
  const editionDropAddress = "0xA66DBF9af5935939c0DbAEaA75ba20b9DacCc720";
  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  );
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0);
  }, [nftBalance]);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to XXisp-DAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }
  return (
    <div className="mint-nft">
      <h1>Mint your free XXisp Card</h1>
      <div className="btn-hero">
        <Web3Button
          contractAddress={editionDropAddress}
          action={(contract) => {
            contract.erc1155.claim(0, 1);
          }}
          onSuccess={() => {
            console.log(
              `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
            );
          }}
          onError={(error) => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your Card (FREE)
        </Web3Button>
      </div>
    </div>
  );

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>XXisp Member Page</h1>
        <p>Welcome to Republica!!!</p>
      </div>
    );
  }
};
export default App;
