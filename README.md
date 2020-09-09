# SmartContract - Solidity - Truflle - React - IPFS

<img src="https://i.ibb.co/LkxFpZ6/download.png">

## Setup to run project
- Before that, let's install [Docker, Docker-compose](https://docs.docker.com/)
- Setup MetaMask extension for browser, then create a account and a customRpc listen to port truffle 8545.

## Setting ENVIRONMENT_VARS
```
$ cp .env.example .env
$ vim .env
# rewrite your env vars
```
- final run command to start:
```
$ ./init.sh
$ cd client
# rewrite your env vars then
$ yarn install
$ yarn start
```

## Struct folder
- `/ethereum`: smartcontract.
- `/test`: run test smartcontract.
- `/server`: nodejs connect to smartcontract.
- `/migrations`: init database.
- `/view`: front-end reactjs.
