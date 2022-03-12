# Escrow_dApp_Pokaldot

### Steps to Deploy Contract to Moonbase Aplha Testnet- Polkadot Parachain

cd backend
```javascript
1. npx hardhat compile
//compile contract

![contract deployed](https://user-images.githubusercontent.com/90293555/158035513-e7e5092a-ce16-4695-be85-13df05f85603.jpg)

2. npx hardhat run --network moonbase scripts/deploy.js
//deploy contract to testnet

![deployed contract address](https://user-images.githubusercontent.com/90293555/158035519-9e77792d-f3ae-45db-b0b6-a73a1a89aede.jpg)

```
### Testnet:


![testnet](https://user-images.githubusercontent.com/90293555/158035504-e283f0e8-6d99-4e3e-8072-a1db2068bc11.jpg)


### Frontend
```javascript
copy contract address '0x46dB388bd612F706250E4dCAF8F5d42cA920A229'

Copy contract abi to escrow.js

cd frontend

npm start
```
![Dapp](https://user-images.githubusercontent.com/90293555/158035529-bb292918-3a27-48cd-a683-88d6c0b14805.jpg)

### Funtionalities:

Buyer Send Payment

Agent confirm Payment 

Seller recieve Payment

Payment and delivery confirm

![interact metamask](https://user-images.githubusercontent.com/90293555/158035557-f168cd3c-2034-4ec3-b485-af894f0339f2.jpg)

