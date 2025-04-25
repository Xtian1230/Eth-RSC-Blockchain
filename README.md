# Eth-RSC-Blockchain
Description

This is a blockchain repository for supply chain made by team akatsuki modified to accommodate for Philippine Rice Supply Chain. As of now the front end of the system are the only ones that are modified from the original Manufacturer, Third Party, Delivery Hub, and Customer to Producer, Distributor, Delivery Hub and Retailer. Additionally added Seed Provider, Miller, And Consumer. Currently Producer, Distributor, Delivery Hub and Retailer are the only ones working as it already has a complete smart contract while Seed Provider, Miller, And Consumer are only in Front-end. This repository also did not have a connected database as it only stores locally.

From:
Manufacturer → Third Party → Delivery Hub → Customer
To:
Seed Provider → Producer → Miller → Distributor → Delivery Hub → Retailer → Consumer

Original Repository: https://github.com/rishav4101/eth-supplychain-dapp?tab=readme-ov-file

Installation and Setup
Prerequisites : npm, git, docker(optional)

Clone the repository
```js
https://github.com/Xtian1230/Eth-RSC-Blockchain.git
```
Install dependencies
```js
npm i
```
Install ganache-cli
```js
npm i -g ganache-cli
```
Configure ganache-cli for 10 accounts and extend gasLimit to 6721975000 and beyond, so as to have enough gas for migrating the smart contracts and a data flow for the prototype.
```js
ganache-cli --accounts 10 --gasLimit 6721975000
```
If you want to run the ganache-cli on docker then use the following command
```js
sudo docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest -h 0.0.0.0 --accounts 10 --gasLimit 6721975000
```
Migrate the contracts
```js
truffle migrate --network=develop --reset
```
Open a second terminal and enter the client folder
```js
cd client
```
Install all packages in the package.json file
```js
npm i
```
Setup an .env file using the nano .env command and enter the google maps api key and set the react rpc port to 8545 since the ganache-cli runs on the same port by default. The final .env file must look like this
```js
REACT_APP_GOOGLE_MAP_API_KEY=*************************
REACT_APP_RPC=http://127.0.0.1:8545/
```
Run the app
```js
npm start
```
The app gets hosted by default at port 3000.
