# hardhat-next-ts-template

This is a template for a full-stack Web3 Ethereum application that utilizes Hardhat, Next.js with TypeScript, Ethers.js, and Alchemy. First thing to do when stepping into this repo is to install the dependencies with 

```shell
npm i
```

Remember to step into `frontend/` and do the same.

Some example hardhat tasks are as follows:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
```

Remember to edit the `.env` file with the appropriate details.
# Etherscan verification

The following is an example of how to deploy a contract to Rinkeby and verify on Etherscan. 

```shell
hardhat run --network rinkeby scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
