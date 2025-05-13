import hre from "hardhat";

async function main() {
  const GovernanceProposals = await hre.ethers.getContractFactory(
    "GovernanceProposals"
  );
  const governanceProposals = await GovernanceProposals.deploy();

  await governanceProposals.waitForDeployment();

  console.log(
    "GovernanceProposals deployed to:",
    await governanceProposals.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
