<h1>Prescription Smart Contract Application</h1>

This repository contains a demonstration application that utilizes **JavaScript**, **React**, and **Solidity** to simulate the process of prescription issuance via **smart contracts** on the **blockchain**. This application was developed as part of an academic project to showcase how blockchain technology can be applied in the healthcare field to ensure the security and integrity of medical prescriptions.

<h2>Overview</h2>

The application consists of three main components:

- **Smart Contract**: Written in Solidity, the smart contract is deployed on a blockchain (we used Ganache for development purposes) and manages the creation, retrieval, and validation of medical prescriptions. It ensures that only authorized medical professionals can create prescriptions and securely stores prescriptions on the blockchain.

- **React Frontend**: The user interface was developed using the React library to interact with the smart contract. Users can create new prescriptions, retrieve existing prescriptions, and verify the authenticity of a prescription using this interface.

- **Development Blockchain (Ganache)**: For development purposes, we use Ganache, a local blockchain that allows testing and simulating transactions without incurring costs. This makes development and testing more efficient.

<h2>Prerequisites</h2>

Ensure that you have the following dependencies installed:

- Node.js
- Truffle (smart contract development framework)
- Ganache (for the development blockchain environment)
- MetaMask (browser extension for interacting with the blockchain)

<h2>Configuration and Execution</h2>

Follow these steps to set up and run the application:

- Clone this repository to your local environment.

- Navigate to the project folder in the terminal and run the npm install command to install dependencies.

- Start Ganache to obtain a local instance of the blockchain.

- Configure MetaMask to connect to Ganache.

- Compile and migrate the smart contract to the blockchain using Truffle. Use truffle compile and truffle migrate.

- Start the React application with the npm start command.

- Access the application in your browser at http://localhost:3000.

<h2>Usage</h2>

You can now use the application to simulate the process of medical prescription issuance:

- Connect to your MetaMask account.

- Create a new prescription by providing necessary information, such as the patient's name, medications, and the doctor's signature.

- Retrieve existing prescriptions.

- Verify the authenticity of a prescription by providing the prescription number and the doctor's signature.

<h2>Contributions</h2>

Feel free to contribute to this project. You can enhance the user interface, add additional features, or optimize the smart contract.
Authors

- Matheus Mota Gurgel Gurjão

