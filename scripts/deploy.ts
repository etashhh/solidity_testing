import { ethers } from "hardhat";

async function main() {
  const Thing = await ethers.getContractFactory("TestingThings");
  const thing = await Thing.deploy("Things", "THINGS", 25);

  await thing.deployed();

  console.log("ERC721 contract deployed to:", thing.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
