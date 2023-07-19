
export const contractAddressValidation = "0x4F430c214DFc1cF6ace4050025177cB30f129431";

export const abiValidation =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_klipId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_batchNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_mfgDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_warranty",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "hashData",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_klipId",
				"type": "uint256"
			}
		],
		"name": "getHashById",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_klipId",
				"type": "uint256"
			}
		],
		"name": "Validate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "validateHashByKlipId",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

	
	

export const APIkey = "YYZDE57B9239MQEYSVYIZW6FJZ85TCCKG6";

export const endpoint = "https://api-goerli.etherscan.io/";


export const ALCHEMY_API_KEY ="FOxH7918EsvBRVwTUVGk5gzhgE2UFoxJ"
export const SEPOLIA_PRIVATE_KEY="de4b0fad5b2956afa383903e4ebcd407d1d6417fdfb977f08c5d5a4a112c199c"

export const IPFS_INFURAPROJECT_ID="2SVWWrhQ3SgcSyOW8qroLdETZf2"
export const IPFS_PRIVATE_KEY="76cc620d93837d2f1171082c5a44e82f"

export const VALIDATION_CONTRACT_ADDRESS="3eE0df02F253e64beB4cf1a29E9543c1fEa5526B"
export const GANACHE_URL="http://localhost:7545"