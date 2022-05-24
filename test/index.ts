import { expect } from "chai";
import { ethers } from "hardhat";
import { TestingThings } from "../typechain/TestingThings";

describe("Testing Things", () => {
  let thing: TestingThings;

  let owner: any;
  let acct1: any;
  
  beforeEach(async () => {
    [owner, acct1] = await ethers.getSigners();

    const Thing = await ethers.getContractFactory("TestingThings", owner);

    thing = (await Thing.deploy("Things", "THINGS", 25)) as TestingThings;
    await thing.deployed();
  });
  describe("Deployment tests", () => {
    it("Should make sure the correct constructor arguments are set", async () => {
      expect(await thing.name()).to.equal("Things");
      expect(await thing.symbol()).to.equal("THINGS");
      expect(await thing.maxSupply()).to.equal(25);
    });
    it("Should make sure the owner is set correctly", async () => {
      expect(await thing.owner()).to.equal(owner.address);
    });
  });
  describe("Functionality tests", () => {
    it("Should fail if appropriate funds are not sent", async () => {
      await expect(thing.connect(owner).mint(25, { value: "25" })).to.be.revertedWith("Did not send appropriate funds");
    });
    it("Should fail if trying to mint more than the supply", async () => {
      await expect(thing.connect(owner).mint(30, { value: "25000000000000000" })).to.be.revertedWith("You're trying to mint too many");
    });
    it("Should mint the desired quantity", async () => {
      await thing.connect(owner).mint(25, { value: "25000000000000000" })
      let ownerBalance = await thing.balanceOf(owner.address);

      await expect(ownerBalance).to.equal(25);
    });
  });
});
