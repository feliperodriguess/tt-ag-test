# Code Challenge: Full-Stack Blockchain Engineer

## Code Challenge

### Task

Create a simple decentralized application (dApp) that allows users to submit and view governance proposals. The application should have a frontend built with Next.js and TypeScript, and it should interact with a smart contract deployed on a test Ethereum network (e.g., Rinkeby or Goerli). The smart contract should allow users to create proposals and retrieve a list of all proposals.

### Requirements

1.  **Frontend**:

    - Use Next.js and TypeScript to create a simple user interface.
    - Implement a form to submit a new governance proposal.
    - Display a list of all submitted proposals.

2.  **Smart Contract**:

    - Write a simple Solidity smart contract that allows users to:

      - Create a proposal (with a title and description).
      - Retrieve all proposals.

    - Deploy the smart contract to a test network (Rinkeby or Goerli).

3.  **Integration**:

    - Use Web3.js or Ethers.js to connect the frontend to the smart contract.
    - Ensure that the application can read from and write to the smart contract.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
