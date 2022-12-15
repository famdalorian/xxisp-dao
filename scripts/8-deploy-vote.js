import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "XXisp Governance DAO",

      voting_token_address: "0x13100136EDf17BB60BD6d7b88299665B40468247",

    
      voting_delay_in_blocks: 0,

      // set to 1 day = 6570 blocks
      voting_period_in_blocks: 6570,

      // The minimum % of the total supply that need to vote for
      // the proposal to be valid after the time for the proposal has ended.
      voting_quorum_fraction: 50,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      proposal_token_threshold: 0,
    });

    console.log(
      "✅ Successfully deployed vote contract, address:",
      voteContractAddress,
    );
  } catch (err) {
    console.error("Failed to deploy vote contract", err);
  }
})();

// governance address: 0xB290E3B6185DcB41a7D8f3d85f2a50E2F95bc2A6